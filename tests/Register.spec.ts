import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Object/Register';

test.describe('Register Page Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto('/');
  });

  test('TC1 - should navigate to signup form', async ({ page }) => {
    const name = 'Test User';
    const email = `testuser${Date.now()}@example.com`;

    await registerPage.Register(name, email);

    // Verifikasi halaman "Enter Account Information" muncul
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    await page.pause()
  });

  test('TC2 - should show error for existing email', async ({ page }) => {
    const name = 'Test User';
    const email = process.env.USER_EMAIL!; 

    await registerPage.Register(name, email);
    // Verifikasi pesan error "Email Address already exist!" muncul

    
    await expect(page.locator('text=Email Address already exist!')).toBeVisible();
  });

  


});