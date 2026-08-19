import { expect, test } from "@playwright/test";

test("theme and density controls update the provider contract independently of dark mode", async ({ page }) => {
  await page.goto("/themes");
  const root = page.locator("html");
  const shell = page.locator("[data-mivama-shell]");

  await expect(shell).toHaveCount(1);
  await expect(shell).toHaveAttribute("data-mivama-theme", "product");
  await expect(shell).toHaveAttribute("data-density", "comfortable");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await page.getByRole("combobox", { name: "Theme", exact: true }).selectOption("editorial");
  await page.getByRole("combobox", { name: "Density", exact: true }).selectOption("compact");

  await expect(shell).toHaveAttribute("data-mivama-theme", "editorial");
  await expect(shell).toHaveAttribute("data-density", "compact");
  await expect(root).toHaveClass(/dark/);
});

test("dialog traps focus inside the provider portal and restores focus", async ({ page }) => {
  await page.goto("/overlays/dialog");
  const shell = page.locator("[data-mivama-shell]");
  const trigger = page.getByRole("button", { name: "Invite collaborators" });

  await trigger.click();
  const dialog = shell.getByRole("dialog", { name: "Invite collaborators" });
  const email = dialog.getByRole("textbox", { name: "Email address" });
  const close = dialog.getByRole("button", { name: "Close" });
  await expect(dialog).toBeVisible();

  await close.focus();
  await page.keyboard.press("Tab");
  await expect(email).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("sheet closes from the provider portal and restores focus", async ({ page }) => {
  await page.goto("/overlays/sheet");
  const shell = page.locator("[data-mivama-shell]");
  const trigger = page.getByRole("button", { name: "Open right" });

  await trigger.click();
  const dialog = shell.getByRole("dialog", { name: "Right sheet" });
  const firstSwitch = dialog.getByRole("switch", { name: "Email alerts" });
  const close = dialog.getByRole("button", { name: "Close" });
  await expect(dialog).toBeVisible();

  await close.focus();
  await page.keyboard.press("Tab");
  await expect(firstSwitch).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("tabs support arrow-key navigation", async ({ page }) => {
  await page.goto("/navigation");
  const tabs = page.getByRole("tablist", { name: "horizontal default tabs" });
  const overview = tabs.getByRole("tab", { name: "Overview" });
  const activity = tabs.getByRole("tab", { name: "Activity" });

  await overview.focus();
  await page.keyboard.press("ArrowRight");
  await expect(activity).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(activity).toHaveAttribute("aria-selected", "true");
});

test("mobile sidebar opens in the provider portal and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/layout");
  const shell = page.locator("[data-mivama-shell]");
  const trigger = page.getByRole("button", { name: "Toggle showcase sidebar" });
  await expect(page.locator('[data-slot="sidebar"]')).toHaveCount(0);

  await trigger.click();
  const sidebar = shell.getByRole("dialog", { name: "Sidebar" });
  await expect(sidebar).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sidebar).toBeHidden();
  await expect(trigger).toBeFocused();
});
