// @ts-check
const { test, expect } = require("@playwright/test");

test("has QR code, Wi-Fi Name field, and Password field", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("QR Code")).toBeVisible();
  await expect(page.getByLabel("Wi-Fi Name")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

// I implicitly assume the QR code plugin shows the correct content!! I'm checking the aria-label and assuming the QR Code library is handling it correctly
test("updates the QR code when I change the Wi-Fi name, uses 'nopass' auth when password is empty", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Wi-Fi Name").fill("Testing");

  // TODO: Test the QR Code's actual content
  await expect(page.getByLabel("QR Code")).toHaveAttribute(
    "aria-description",
    `WIFI:T:nopass;S:"Testing";;`, // I'm using backticks here to avoid needing to escape doublequote chars
  );
});

// If I add a password, does the QR code update and show that I'm using WPA?
test("updates the QR code when I add a password", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Wi-Fi Name").fill("Testing");
  await page.getByLabel("Password").fill("HelloWorld");

  // TODO: Test the QR Code's actual content
  await expect(page.getByLabel("QR Code")).toHaveAttribute(
    "aria-description",
    `WIFI:T:WPA;S:"Testing";P:HelloWorld;;`, // I'm using backticks here to avoid needing to escape doublequote chars
  );
});

test("creates the Google Analytics `gtag` object", async ({ page }) => {
  await page.goto("/");

  const gtagType = await page.evaluate("typeof gtag");

  await expect(gtagType).toEqual("function");
});

test("downloads an image when clicking the download button", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Wi-Fi Name").fill("Testing");

  const downloadPromise = page.waitForEvent("download");

  // Click download button
  await page.getByText("Download").click();
  const download = await downloadPromise;

  // Confirm something downloads
  expect(download.suggestedFilename()).toBe("Testing-qr-code.png");
});
