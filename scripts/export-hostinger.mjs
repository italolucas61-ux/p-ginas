import { chromium, expect } from "@playwright/test";
import { zipSync, strToU8 } from "fflate";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "entrega/teacher-murilo");
const portServer = createServer();
await new Promise((resolve) => portServer.listen(0, "127.0.0.1", resolve));
const port = portServer.address().port;
await new Promise((resolve) => portServer.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    path.join(root, "node_modules/next/dist/bin/next"),
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
server.stdout.on("data", (chunk) => {
  serverLog += chunk;
});
server.stderr.on("data", (chunk) => {
  serverLog += chunk;
});
const cache = new Map();
let browser;

async function dataUrl(address) {
  if (address.startsWith("data:")) return address;
  if (cache.has(address)) return cache.get(address);
  const response = await fetch(address);
  if (!response.ok)
    throw new Error(
      `Não foi possível incluir o recurso ${new URL(address).pathname}: HTTP ${response.status}`,
    );
  const type =
    response.headers.get("content-type")?.split(";")[0] ??
    "application/octet-stream";
  const result = `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
  cache.set(address, result);
  return result;
}

async function inlineCss(address) {
  const response = await fetch(address);
  if (!response.ok)
    throw new Error(`Stylesheet indisponível: HTTP ${response.status}`);
  let css = await response.text();
  const references = [...css.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)];
  for (const match of references) {
    const resource = match[1].trim();
    if (resource.startsWith("data:") || resource.startsWith("#")) continue;
    css = css.replace(
      match[0],
      `url("${await dataUrl(new URL(resource, address).href)}")`,
    );
  }
  return css.replace(/\/\*[#@]\s*sourceMappingURL=.*?\*\//g, "");
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`Servidor de exportação não iniciou.\n${serverLog}`);
    try {
      if ((await fetch(origin)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* Wait for this process only. */
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  if (!ready)
    throw new Error(
      `Tempo esgotado ao iniciar o servidor de exportação.\n${serverLog}`,
    );
  browser = await chromium.launch({
    headless: true,
    ...(existsSync("/usr/bin/chromium")
      ? { executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] }
      : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ver todos os 21 conteúdos" }).click();
  await expect(page.locator(".module-card")).toHaveCount(21);
  const modules = await page.locator(".module-card").evaluateAll((cards) =>
    cards.map((card, index) => {
      card.dataset.moduleIndex = String(index);
      return {
        title: card.querySelector("strong").textContent.trim(),
        category: card.querySelector("small").textContent.trim(),
        html: card.outerHTML,
        dialog: "",
      };
    }),
  );
  for (const [index, module] of modules.entries()) {
    await page.locator(".module-card").nth(index).click();
    await expect(page.locator("#module-dialog-title")).toHaveText(module.title);
    module.dialog = await page.locator("#conteudo dialog").innerHTML();
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "Mostrar menos conteúdos" }).click();
  await expect(page.locator(".module-card")).toHaveCount(8);
  const stylesheetUrls = await page
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) => links.map((link) => link.href));
  const css = (await Promise.all(stylesheetUrls.map(inlineCss))).join("\n");
  if (!css.length)
    throw new Error("Nenhum estilo encontrado na página de origem.");
  const images = await page
    .locator("img")
    .evaluateAll((items) => items.map((item) => item.currentSrc || item.src));
  const imageData = await Promise.all(images.map(dataUrl));
  const icon = await page
    .locator('link[rel="icon"]')
    .first()
    .getAttribute("href");
  const iconData = icon ? await dataUrl(new URL(icon, origin).href) : null;
  await page.evaluate(
    ({ css, imageData, iconData }) => {
      document
        .querySelectorAll(
          "script, link[rel=stylesheet], link[rel=preload], link[rel=modulepreload], link[rel=icon], nextjs-portal",
        )
        .forEach((element) => element.remove());
      document
        .querySelectorAll(
          "meta[property='og:image'], meta[property^='og:image:'], meta[name='twitter:image'], meta[name='twitter:image:alt']",
        )
        .forEach((element) => element.remove());
      document.querySelectorAll("img").forEach((image, index) => {
        image.src = imageData[index];
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");
        image.removeAttribute("loading");
      });
      const style = document.createElement("style");
      style.textContent = css;
      document.head.append(style);
      if (iconData) {
        const icon = document.createElement("link");
        icon.rel = "icon";
        icon.href = iconData;
        document.head.append(icon);
      }
      document
        .querySelectorAll("[data-nextjs-scroll-focus-boundary]")
        .forEach((element) =>
          element.removeAttribute("data-nextjs-scroll-focus-boundary"),
        );
      document.querySelector("#mobile-menu").hidden = true;
      document
        .querySelectorAll("dialog")
        .forEach((dialog) => dialog.removeAttribute("open"));
    },
    { css, imageData, iconData },
  );
  const markup = await page.locator("html").evaluate((html) => html.outerHTML);
  const runtime = await readFile(
    path.join(root, "scripts/standalone-runtime.js"),
    "utf8",
  );
  const data = JSON.stringify({ modules }).replaceAll("<", "\\u003c");
  const html =
    "<!doctype html>\n" +
    markup.replace(
      "</body>",
      `<script type="application/json" id="standalone-data">${data}</script><script>${runtime}</script></body>`,
    );
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, "index.html"), html);
  await writeFile(
    path.join(root, "entrega/teacher-murilo.zip"),
    zipSync({ "index.html": strToU8(html) }, { level: 9 }),
  );
  console.log(
    `HTML independente e ZIP criados em entrega/. ${modules.length} módulos, fontes e estilos incorporados; nenhuma instalação necessária para abrir a entrega.`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
