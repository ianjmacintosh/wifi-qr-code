// @ts-check
const { test, expect } = require("@playwright/test");

test("has QR code, Wi-Fi Name field, and Password field", async ({ page }) => {
  // Do a QR code, a Wi-Fi field, and a password field all display?
  // If I change the Wi-Fi name, does the QR update and show the appropriate string? Nopass auth?
  // If I add a password, does the QR code update and show that I'm using WPA?
  await page.goto("/");

  // Expect page to show:
  // * QR code
  await expect(page.getByLabel(/^QR Code for/)).toBeVisible();
  // * Wi-Fi field
  // * Password field
});
