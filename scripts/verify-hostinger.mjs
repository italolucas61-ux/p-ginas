import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { unzipSync, strFromU8 } from "fflate";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const file = path.join(root, "entrega/teacher-murilo/index.html");
const html = await readFile(file, "utf8");
const archive = unzipSync(
  await readFile(path.join(root, "entrega/teacher-murilo.zip")),
);
assert.deepEqual(Object.keys(archive), ["index.html"]);
assert.equal(strFromU8(archive["index.html"]), html);
const missing = [];
const server = createServer((request, response) => {
  if (
    ["/previas/teacher-murilo/", "/previas/teacher-murilo/index.html"].includes(
      request.url,
    )
  ) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(html);
  } else {
    missing.push(request.url);
    response.writeHead(404);
    response.end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const addresses = [null, `${origin}/previas/teacher-murilo/`];
const browser = await chromium.launch({
  headless: true,
  ...(existsSync("/usr/bin/chromium")
    ? { executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] }
    : {}),
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const runtimeErrors = [];
const remoteAssets = [];
page.on("pageerror", (error) => runtimeErrors.push(error.message));
page.on("request", (request) => {
  if (/^https?:/.test(request.url()) && !request.url().startsWith(origin))
    remoteAssets.push(request.url());
});
let checks = 0;
async function openPage(address) {
  if (address) {
    await page.goto(address, { waitUntil: "load" });
  } else {
    // This managed browser blocks file:// navigation by administrator policy.
    // Load the exact delivery document in memory; do not bypass that policy.
    await page.goto("about:blank");
    await page.setContent(html, { waitUntil: "load" });
  }
}
async function bounds() {
  const layout = await page.evaluate(() => ({
    viewport: innerWidth,
    width: document.documentElement.scrollWidth,
    clipped: [...document.querySelectorAll("h1,h2,h3,button,.cta")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.width &&
          rect.height &&
          !element.closest("[hidden],dialog:not([open])") &&
          (rect.left < -1 ||
            rect.right > innerWidth + 1 ||
            element.scrollWidth > element.clientWidth + 2)
        );
      })
      .map((element) => element.textContent.trim()),
  }));
  assert.ok(layout.width <= layout.viewport, JSON.stringify(layout));
  assert.deepEqual(layout.clipped, []);
}
try {
  for (const address of addresses) {
    const mode = address
      ? "subpasta na hospedagem"
      : "HTML independente em memória, sem rede";
    for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await openPage(address);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".module-card")).toHaveCount(8);
      await bounds();
      await page
        .getByRole("button", { name: "Ver todos os 21 conteúdos" })
        .click();
      await expect(page.locator(".module-card")).toHaveCount(21);
      await bounds();
      console.log(`PASS ${mode}: layout e catálogo em ${width}px`);
      checks++;
    }
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await openPage(address);
      if (width < 1100) {
        await page.getByRole("button", { name: "Abrir menu" }).click();
        await expect(page.locator(".menu-toggle")).toHaveAttribute(
          "aria-expanded",
          "true",
        );
        await page
          .locator("#mobile-menu")
          .getByRole("link", { name: "Conteúdo", exact: true })
          .click();
        await expect(page.locator("#mobile-menu")).toBeHidden();
        await page.getByRole("button", { name: "Abrir menu" }).click();
        await page.keyboard.press("Escape");
        await expect(page.locator(".menu-toggle")).toBeFocused();
      }
      await page
        .getByRole("button", { name: "Vida real", exact: true })
        .click();
      await expect(page.locator(".module-card")).toHaveCount(7);
      await page
        .getByRole("button", {
          name: "Conhecer Inglês para viagem",
          exact: true,
        })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.locator("#module-dialog-title")).toHaveText(
        "Inglês para viagem",
      );
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toBeHidden();
      await expect(
        page.getByRole("button", {
          name: "Conhecer Inglês para viagem",
          exact: true,
        }),
      ).toBeFocused();
      await page.getByRole("button", { name: "Todos", exact: true }).click();
      await expect(page.locator(".module-card")).toHaveCount(8);
      await page
        .getByRole("button", { name: "Ver todos os 21 conteúdos" })
        .click();
      for (const [title, note] of [
        ["Inglês em 10 dias", "não uma promessa de fluência"],
        [
          "Acompanhamento Vitalício Comigo",
          "condições do acompanhamento precisam de confirmação",
        ],
      ]) {
        await page
          .getByRole("button", { name: `Conhecer ${title}`, exact: true })
          .click();
        await expect(page.getByRole("dialog")).toContainText(note);
        await page
          .getByRole("button", { name: "Fechar detalhes do módulo" })
          .click();
      }
      await page
        .getByRole("button", { name: "Mostrar menos conteúdos" })
        .click();
      await expect(page.locator(".module-card")).toHaveCount(8);
      await page
        .locator("summary")
        .filter({ hasText: "Existe garantia?" })
        .click();
      await expect(page.locator("details[open]")).toContainText(
        "ainda não foram informados",
      );
      await page
        .getByRole("button", { name: "Quero garantir minha vaga" })
        .click();
      await expect(page.getByRole("dialog")).toContainText(
        "O checkout ainda não foi conectado.",
      );
      await page.getByRole("button", { name: "Continuar explorando" }).click();
      await expect(page.getByRole("dialog")).toBeHidden();
      await expect(
        page.getByRole("button", { name: "Quero garantir minha vaga" }),
      ).toBeFocused();
      console.log(
        `PASS ${mode}: navegação, filtros, módulos, FAQ e oferta em ${width}px`,
      );
      checks++;
    }
  }
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 375, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(addresses[1], { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(axe.violations, []);
    await page.screenshot({
      path: path.join(root, `entrega/preview-${name}.png`),
    });
    console.log(`PASS auditoria automatizada de acessibilidade ${name}`);
    checks++;
  }
  assert.deepEqual(runtimeErrors, []);
  assert.deepEqual(remoteAssets, []);
  assert.deepEqual(missing, []);
  console.log(
    `${checks} verificações aprovadas. ZIP íntegro; sem dependências externas de recursos e sem erros de JavaScript.`,
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
