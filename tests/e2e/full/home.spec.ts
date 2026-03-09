import {test, expect} from '@playwright/test';

test.describe ("Home page", () => {
    test("Home page features", async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.widget-container-kpforecast')).toBeVisible();
    });
});