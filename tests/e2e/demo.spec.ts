import { expect, test } from "@playwright/test";

test("dashboard links to the Seoul market", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Korean local signal/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Open Seoul market/i }).click();

  await expect(
    page.getByRole("heading", { name: "2026 Seoul Mayoral Election Winner" }),
  ).toBeVisible();
  await expect(page.getByText("Oh Se-hoon YES")).toBeVisible();
});
