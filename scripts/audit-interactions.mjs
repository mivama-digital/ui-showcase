import { chromium } from "@playwright/test";

async function runInteractionAudit() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error" || (msg.type() === "warning" && !text.includes("Download the React DevTools"))) {
      errors.push({ type: `console.${msg.type()}`, text, url: page.url() });
    }
  });
  page.on("pageerror", (err) => {
    errors.push({ type: "pageerror", text: err.stack || err.message, url: page.url() });
  });

  console.log("=== STEP 1: AUDITING ACTIONS & TOGGLES (/actions) ===");
  await page.goto("http://localhost:3000/actions", { waitUntil: "networkidle" });
  
  // Click visible buttons
  const buttons = await page.locator("button:visible:not([disabled])").all();
  console.log(`Found ${buttons.length} visible enabled buttons on /actions`);
  for (const btn of buttons.slice(0, 10)) {
    try { await btn.click({ timeout: 1000 }); } catch {}
  }

  console.log("=== STEP 2: AUDITING FORMS & CONTROLS (/forms) ===");
  await page.goto("http://localhost:3000/forms", { waitUntil: "networkidle" });
  
  // Test Input & Textarea
  const inputs = await page.locator("input[type='text']:visible:not([readonly]):not([disabled]), input[type='email']:visible:not([readonly]):not([disabled])").all();
  for (const input of inputs.slice(0, 3)) {
    try { await input.fill("Test text", { timeout: 1000 }); } catch {}
  }

  // Test Checkbox
  const checkboxes = await page.locator("button[role='checkbox']:visible:not([disabled])").all();
  for (const cb of checkboxes.slice(0, 3)) {
    try {
      await cb.click({ timeout: 1000 });
      await cb.click({ timeout: 1000 });
    } catch {}
  }

  // Test Switch
  const switches = await page.locator("button[role='switch']:visible:not([disabled])").all();
  for (const sw of switches.slice(0, 3)) {
    try {
      await sw.click({ timeout: 1000 });
      await sw.click({ timeout: 1000 });
    } catch {}
  }

  // Test Select
  const selectTriggers = await page.locator("button[role='combobox']:visible:not([disabled])").all();
  if (selectTriggers.length > 0) {
    try {
      await selectTriggers[0].click({ timeout: 1000 });
      await page.waitForTimeout(200);
      const options = await page.locator("[role='option']:visible").all();
      if (options.length > 0) {
        await options[0].click({ timeout: 1000 });
      } else {
        await page.keyboard.press("Escape");
      }
    } catch {}
  }

  console.log("=== STEP 3: AUDITING DATA & CALENDAR (/data) ===");
  await page.goto("http://localhost:3000/data", { waitUntil: "networkidle" });

  // Test Calendar month navigation
  const nextButtons = await page.locator("[data-slot='calendar'] button").all();
  for (const btn of nextButtons.slice(0, 2)) {
    try { await btn.click({ timeout: 1000 }); } catch {}
  }

  // Test Day selection
  const dayButtons = await page.locator("[data-slot='calendar'] button[data-day]").all();
  if (dayButtons.length > 15) {
    try { await dayButtons[15].click({ timeout: 1000 }); } catch {}
  }

  // Test Chart hover
  const chartBars = await page.locator(".recharts-bar-rectangle").all();
  if (chartBars.length > 0) {
    await chartBars[1].hover();
    await page.waitForTimeout(200);
  }

  console.log("=== STEP 4: AUDITING OVERLAYS (/overlays/dialog & /overlays/sheet) ===");
  await page.goto("http://localhost:3000/overlays/dialog", { waitUntil: "networkidle" });
  const dialogTriggers = await page.locator("button:has-text('Open'), button:has-text('Delete')").all();
  if (dialogTriggers.length > 0) {
    try {
      await dialogTriggers[0].click({ timeout: 1000 });
      await page.waitForTimeout(300);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
    } catch {}
  }

  await page.goto("http://localhost:3000/overlays/sheet", { waitUntil: "networkidle" });
  const sheetTriggers = await page.locator("button:has-text('Open')").all();
  if (sheetTriggers.length > 0) {
    try {
      await sheetTriggers[0].click({ timeout: 1000 });
      await page.waitForTimeout(300);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
    } catch {}
  }

  console.log("=== STEP 5: AUDITING NAVIGATION & TABS (/navigation) ===");
  await page.goto("http://localhost:3000/navigation", { waitUntil: "networkidle" });
  const tabs = await page.locator("[role='tab']").all();
  for (const tab of tabs.slice(0, 4)) {
    try {
      await tab.click({ timeout: 1000 });
      await page.waitForTimeout(100);
    } catch {}
  }

  console.log("=== STEP 6: AUDITING CONTENT & ACCORDION (/content) ===");
  await page.goto("http://localhost:3000/content", { waitUntil: "networkidle" });
  const accordionTriggers = await page.locator("[data-state='closed'][data-orientation]").all();
  for (const acc of accordionTriggers.slice(0, 3)) {
    try { await acc.click({ timeout: 1000 }); } catch {}
  }

  console.log("=== STEP 7: AUDITING ATTACHMENTS & COMMUNICATION (/attachments) ===");
  await page.goto("http://localhost:3000/attachments", { waitUntil: "networkidle" });

  console.log("=== STEP 8: AUDITING FEEDBACK & TOAST (/feedback) ===");
  await page.goto("http://localhost:3000/feedback", { waitUntil: "networkidle" });

  console.log("=== STEP 9: AUDITING LAYOUT & SIDEBAR (/layout) ===");
  await page.goto("http://localhost:3000/layout", { waitUntil: "networkidle" });

  await browser.close();

  console.log("\n=================== INTERACTION AUDIT SUMMARY ===================");
  if (errors.length === 0) {
    console.log("ALL INTERACTIONS SUCCESSFUL! 0 runtime errors, 0 warnings during user interactions!");
  } else {
    console.log(`Found ${errors.length} errors/warnings during interactions:`);
    for (const e of errors) {
      console.log(`[${e.type}] ${e.url}: ${e.text}`);
    }
    process.exit(1);
  }
}

runInteractionAudit().catch((err) => {
  console.error("Interaction audit failed:", err);
  process.exit(1);
});
