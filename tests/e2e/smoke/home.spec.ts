import {test, expect} from '@playwright/test';

test.describe ("Home page", () => {
    test("Visit home page", async ({ page }) => {
        await page.goto('/');
    });
});