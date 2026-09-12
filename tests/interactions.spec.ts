import { expect, test } from "@playwright/test";

test("theme and density controls update the document contract independently of dark mode", async ({ page }) => {
  await page.goto("/themes");
  const root = page.locator("html");

  await expect(root).toHaveAttribute("data-mivama-theme", "product");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await page.getByRole("combobox", { name: "Theme", exact: true }).selectOption("editorial");
  await page.getByRole("combobox", { name: "Density", exact: true }).selectOption("compact");

  await expect(root).toHaveAttribute("data-mivama-theme", "editorial");
  await expect(root).toHaveAttribute("data-density", "compact");
  await expect(root).toHaveClass(/dark/);
});

test("dialog traps focus, closes with Escape, and restores focus", async ({ page }) => {
  await page.goto("/overlays/dialog");
  const trigger = page.getByRole("button", { name: "Invite collaborators" });

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Invite collaborators" });
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

test("sheet closes with Escape and restores focus", async ({ page }) => {
  await page.goto("/overlays/sheet");
  const trigger = page.getByRole("button", { name: "Open right" });

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Right sheet" });
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

test("mobile sidebar opens as a sheet and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/layout");
  const trigger = page.getByRole("button", { name: "Toggle showcase sidebar" });
  await expect(page.locator('[data-slot="sidebar"]')).toHaveCount(0);

  await trigger.click();
  const sidebar = page.getByRole("dialog", { name: "Sidebar" });
  await expect(sidebar).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sidebar).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("desktop sidebar is positioned below sticky navbar without overlap", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/layout");

  const sidebarHeader = page.locator('[data-sidebar="header"]');
  await expect(sidebarHeader).toBeVisible();

  const box = await sidebarHeader.boundingBox();
  expect(box).not.toBeNull();
  // Sticky header is h-14 (56px tall). The sidebar header must start at or below y=56.
  expect(box!.y).toBeGreaterThanOrEqual(56);
});


