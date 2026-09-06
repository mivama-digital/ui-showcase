export const showcaseRoutes = [
  "/",
  "/themes",
  "/actions",
  "/content",
  "/feedback",
  "/forms",
  "/navigation",
  "/overlays/dialog",
  "/overlays/sheet",
  "/attachments",
  "/layout",
  "/overlays/primitives",
] as const;

export const themes = ["light", "dark"] as const;

export const overlayCases = [
  { route: "/overlays/dialog", trigger: "Invite collaborators", name: "Invite collaborators", snapshot: "dialog-form" },
  { route: "/overlays/dialog", trigger: "Footer close button", name: "Close from the footer", snapshot: "dialog-footer-close" },
  { route: "/overlays/dialog", trigger: "Delete project", name: "Delete this project?", snapshot: "dialog-destructive" },
  { route: "/overlays/dialog", trigger: "Open controlled dialog", name: "Controlled state", snapshot: "dialog-controlled" },
  { route: "/overlays/sheet", trigger: "Open top", name: "Top sheet", snapshot: "sheet-top" },
  { route: "/overlays/sheet", trigger: "Open right", name: "Right sheet", snapshot: "sheet-right" },
  { route: "/overlays/sheet", trigger: "Open bottom", name: "Bottom sheet", snapshot: "sheet-bottom" },
  { route: "/overlays/sheet", trigger: "Open left", name: "Left sheet", snapshot: "sheet-left" },
  { route: "/overlays/sheet", trigger: "Explicit close only", name: "Explicit close control", snapshot: "sheet-explicit-close" },
] as const;

export async function selectTheme(
  page: import("@playwright/test").Page,
  theme: (typeof themes)[number],
) {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("mivama-theme", selectedTheme);
  }, theme);
}
