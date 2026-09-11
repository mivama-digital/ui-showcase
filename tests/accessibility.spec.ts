import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { overlayCases, selectTheme, showcaseRoutes, themes } from "./routes";

for (const theme of themes) {
  for (const route of showcaseRoutes) {
    test(`${theme} ${route} has no accessibility violations`, async ({ page }) => {
      await selectTheme(page, theme);
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  for (const overlay of overlayCases) {
    test(`${theme} open ${overlay.snapshot} has no accessibility violations`, async ({ page }) => {
      await selectTheme(page, theme);
      await page.goto(overlay.route);
      await page.getByRole("button", { name: overlay.trigger, exact: true }).click();
      await expect(page.getByRole("dialog", { name: overlay.name, exact: true })).toBeVisible();

      const results = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
