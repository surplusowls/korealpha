import { expect, test } from "@playwright/test";

test("landing routes to the Seoul market demo", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Read Korea before the market does/i }),
  ).toBeVisible();
  await expect(page.getByText("Research desk preview")).toBeVisible();
  await expect(page.getByText("Source-backed snapshot")).toBeVisible();
  await expect(page.getByText("Agentic proof")).toBeVisible();

  await page.getByRole("link", { name: /Open Seoul mayor demo/i }).click();

  await expect(page).toHaveURL(/\/markets\/seoul-mayor-2026$/);
  await expect(
    page.getByRole("heading", { name: "2026 Seoul Mayoral Election Winner" }),
  ).toBeVisible();
  await expect(page.getByText("Oh Se-hoon YES").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Decision receipt" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Arc Testnet state" }),
  ).toBeVisible();
  await expect(page.getByText("Paper trade only")).toBeVisible();
});

test("landing and demo do not overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });

  for (const path of ["/", "/markets/seoul-mayor-2026"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  }
});
