import { chromium } from "@playwright/test";

const routes = [
  "/",
  "/actions",
  "/attachments",
  "/content",
  "/data",
  "/feedback",
  "/forms",
  "/layout",
  "/navigation",
  "/overlays/dialog",
  "/overlays/sheet",
  "/themes"
];

async function runAudit() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const issues = [];

  page.on("console", (msg) => {
    const text = msg.text();
    const type = msg.type();
    if (type === "error" || type === "warning" || text.includes("Warning:") || text.includes("Error:")) {
      if (text.includes("Download the React DevTools")) return;
      issues.push({
        url: page.url(),
        type: `console.${type}`,
        message: text,
      });
    }
  });

  page.on("pageerror", (err) => {
    issues.push({
      url: page.url(),
      type: "pageerror",
      message: err.stack || err.message,
    });
  });

  page.on("requestfailed", (req) => {
    issues.push({
      url: page.url(),
      type: "requestfailed",
      message: `${req.url()} (${req.failure()?.errorText || "unknown error"})`,
    });
  });

  console.log(`Starting audit across ${routes.length} routes in Light and Dark mode...`);

  for (const route of routes) {
    console.log(`Auditing ${route} [light & dark]...`);
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(500);
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
  }

  await browser.close();

  console.log("\n=================== AUDIT RESULTS ===================");
  if (issues.length === 0) {
    console.log("SUCCESS: 0 console errors, 0 warnings, 0 pageerrors across all routes!");
  } else {
    console.log(`Found ${issues.length} potential issues:`);
    for (const issue of issues) {
      console.log(`[${issue.type}] at ${issue.url}: ${issue.message}`);
    }
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error("Audit runner failed:", err);
  process.exit(1);
});
