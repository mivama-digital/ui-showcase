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

test("latest overlay primitives open and close through their public interactions", async ({ page }) => {
  await page.goto("/overlays/primitives");

  const menuTrigger = page.getByRole("button", { name: "Open project menu" });
  await menuTrigger.click();
  await expect(page.getByRole("menuitem", { name: "Edit details" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuTrigger).toBeFocused();

  const popoverTrigger = page.getByRole("button", { name: "Open status popover" });
  await popoverTrigger.click();
  await expect(page.getByText("The current showcase is synchronized against the latest @mivama/ui main branch.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(popoverTrigger).toBeFocused();

  const alertTrigger = page.getByRole("button", { name: "Delete release" }).first();
  await alertTrigger.click();
  const alertDialog = page.getByRole("alertdialog", { name: "Delete this release?" });
  await expect(alertDialog).toBeVisible();
  await alertDialog.getByRole("button", { name: "Cancel" }).click();
  await expect(alertDialog).toBeHidden();
  await expect(alertTrigger).toBeFocused();
});

test("accordion and collapsible expose their content through disclosure controls", async ({ page }) => {
  await page.goto("/layout");

  const accordionTrigger = page.getByRole("button", { name: "How does delivery work?" });
  const accordionContent = page.getByText("Mivama keeps strategy, implementation, and operation inside one delivery system.");
  await expect(accordionContent).toBeHidden();
  await accordionTrigger.click();
  await expect(accordionContent).toBeVisible();

  const collapsibleTrigger = page.getByRole("button", { name: "Toggle release details" });
  const releaseCopy = page.getByText("The showcase tracks the current UI main branch and verifies coverage whenever the lockfile is synchronized.");
  await expect(releaseCopy).toBeVisible();
  await collapsibleTrigger.click();
  await expect(releaseCopy).toBeHidden();
});

test("toast actions render transient feedback in the shared viewport", async ({ page }) => {
  await page.goto("/feedback");

  await page.getByRole("button", { name: "Success toast" }).click();
  await expect(page.getByText("Changes saved")).toBeVisible();
  await expect(page.getByText("The latest configuration is now active.")).toBeVisible();
});
