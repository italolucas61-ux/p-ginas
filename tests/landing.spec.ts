import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
  test(`layout sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#oferta")).toBeAttached();
    const checkBounds = async () =>
      page.evaluate(() => {
        const viewport = window.innerWidth;
        return {
          viewport,
          pageWidth: document.documentElement.scrollWidth,
          clipped: [...document.querySelectorAll("h1,h2,h3,button,.cta")]
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              if (
                !rect.width ||
                !rect.height ||
                element.closest("dialog:not([open]),[hidden]")
              )
                return false;
              return (
                rect.left < -1 ||
                rect.right > viewport + 1 ||
                element.scrollWidth > element.clientWidth + 2
              );
            })
            .map((element) => element.textContent?.trim()),
        };
      });
    const initial = await checkBounds();
    expect(initial.pageWidth).toBeLessThanOrEqual(width);
    expect(initial.clipped).toEqual([]);
    await page
      .getByRole("button", { name: "Ver todos os 21 conteúdos" })
      .click();
    await expect(page.locator(".module-card")).toHaveCount(21);
    const expanded = await checkBounds();
    expect(expanded.pageWidth).toBeLessThanOrEqual(width);
    expect(expanded.clipped).toEqual([]);
    expect(errors).toEqual([]);
  });
}

for (const width of [375, 1440]) {
  test(`navegação, filtros, módulos, FAQ e oferta em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (width < 1100) {
      const toggle = page.locator(".menu-toggle");
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page
        .locator("#mobile-menu")
        .getByRole("link", { name: "Conteúdo", exact: true })
        .click();
      await expect(page.locator("#mobile-menu")).toBeHidden();
      await expect(page).toHaveURL(/#conteudo$/);
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toBeFocused();
    } else {
      await page
        .locator(".desktop-nav")
        .getByRole("link", { name: "Conteúdo", exact: true })
        .click();
      await expect(page).toHaveURL(/#conteudo$/);
    }
    await page.getByRole("button", { name: "Vida real", exact: true }).click();
    await expect(page.locator(".module-card")).toHaveCount(7);
    await expect(page.locator(".module-count")).toHaveText(
      "7 conteúdos para explorar",
    );
    await page
      .getByRole("button", { name: "Conhecer Inglês para viagem", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Inglês para viagem" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
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
    await expect(page.locator(".module-card")).toHaveCount(21);
    await page.getByRole("button", { name: "Mostrar menos conteúdos" }).click();
    await expect(page.locator(".module-card")).toHaveCount(8);
    const question = page
      .locator("summary")
      .filter({ hasText: "Existe garantia?" });
    await question.click();
    await expect(
      page.getByText(
        "O prazo e as condições de garantia ainda não foram informados.",
        { exact: false },
      ),
    ).toBeVisible();
    await question.click();
    await expect(page.locator("details").last()).not.toHaveAttribute(
      "open",
      "",
    );
    await page
      .getByRole("button", { name: "Quero garantir minha vaga" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "O checkout ainda não foi conectado.",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("dialog")
        .getByRole("link", { name: /Consultar a página oficial/ }),
    ).toHaveAttribute("href", "https://www.teachermurilo.com/zerofluency");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Quero garantir minha vaga" }),
    ).toBeFocused();
  });

  test(`acessibilidade WCAG A/AA em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("metadados, fontes locais e âncoras válidas", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(
    "Jornada do Zero à Fluência | Aprenda Inglês com Teacher Murilo",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Conheça a Jornada/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  expect(
    await page.locator('meta[property="og:image"]').count(),
  ).toBeGreaterThan(0);
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            !document.getElementById(link.getAttribute("href")!.slice(1)),
        )
        .map((link) => link.getAttribute("href")),
    );
  expect(brokenAnchors).toEqual([]);
  expect(
    await page
      .locator("h1")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("Manrope");
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("Inter");
});
