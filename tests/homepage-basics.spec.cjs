// @ts-check
const { test, expect } = require("@playwright/test");

test("has QR code, Wi-Fi Name field, and Password field", async ({ page }) => {
  await page.goto("/");

  // Expect page to show:
  // * QR code
  await expect(page.getByLabel(/^QR Code for/)).toBeVisible();
  // * Wi-Fi field
  await expect(page.getByLabel("Wi-Fi Name")).toBeVisible();
  // * Password field
  await expect(page.getByLabel("Password")).toBeVisible();
});

// I implicitly assume the QR code plugin shows the correct content!! I'm checking the aria-label and assuming the QR Code library is handling it correctly
test("updates the QR code when I change the Wi-Fi name, uses 'nopass' auth when password is empty", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Wi-Fi Name").fill("Testing");

  // TODO: Test the QR Code's actual content
  await expect(page.getByRole("img")).toHaveAttribute(
    "aria-label",
    `QR Code for "WIFI:T:nopass;S:"Testing";;" (without the wrapping quotes)`, // I'm using backticks here to avoid needing to escape doublequote chars
  );
});

// If I add a password, does the QR code update and show that I'm using WPA?
test("updates the QR code when I add a password", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Wi-Fi Name").fill("Testing");
  await page.getByLabel("Password").fill("HelloWorld");

  // TODO: Test the QR Code's actual content
  await expect(page.getByRole("img")).toHaveAttribute(
    "aria-label",
    `QR Code for "WIFI:T:WPA;S:"Testing";P:HelloWorld;;" (without the wrapping quotes)`, // I'm using backticks here to avoid needing to escape doublequote chars
  );
});
