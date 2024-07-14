import { test, expect } from '@playwright/test';

test('Проверка заголовка у страницы', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle("Tool-kit.tech тестовое задание");
});

test('При вводе очередного значения в инпут, должен сбрасываться номер страницы до первой в пагинации', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByRole('textbox').fill('eslint');
  await page.locator('[class*=Paginator__root] > li').waitFor;
  await page.locator('[class*=Paginator__root] > li').nth(2).click();

  await page.getByRole('textbox').fill('babel');
  await page.locator('[class*=Paginator__root] > li').waitFor;
  const active = await page.locator('[class*=Paginator__root] [class*=Paginator__active]');
  await expect(active).toHaveText('1');
});