import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should show hotel search results', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going?').fill('Dhaka');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('Hotels found in Dhaka')).toBeVisible();
});
