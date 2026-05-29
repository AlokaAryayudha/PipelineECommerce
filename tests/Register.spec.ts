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

  test('TC3 - should show error for invalid email format', async ({ page }) => {
    const name = 'Test User';
    const email = 'invalid-email-format';

    await registerPage.Register(name, email);
    // Verifikasi pesan error "Invalid email address!" muncul
    await expect(page.locator('text=Invalid email address!')).toBeVisible();
  });

  test('TC4 - should show error for empty name field', async ({ page }) => {
    const name = '';
    const email = `testuser${Date.now()}@example.com`;

    await registerPage.Register(name, email);
    await page.pause()

    // Cek native browser validation message
  const validationMessage = await page.locator('[data-qa="signup-name"]').evaluate(el => (el as HTMLInputElement).validationMessage);

  expect(validationMessage).toBe('Please fill out this field.');

  });

  test('TC5 - should show error for empty email field', async ({ page }) => {
    const name = 'Test User';
    const email = '';

    await registerPage.Register(name, email);
     // Cek native browser validation message
    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');
  }); 

  test('TC6 - should show error for invalid email format (missing @)', async ({ page }) => {
    const name = 'Test User';
    const email = 'invalidemail.com';

    await registerPage.Register(name, email);

    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe(`Please include an '@' in the email address. 'invalidemail.com' is missing an '@'.`);
    
  }); 

  test('TC7 - should show error for invalid email format (missing domain)', async ({ page }) => {
    const name = 'Test User';
    const email = 'invalidemail@';

    await registerPage.Register(name, email);
    
    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe(`Please enter a part following '@'. 'invalidemail@' is incomplete.`);
  });

  test('TC8 - should show error for invalid email format (missing username)', async ({ page }) => {
    const name = 'Test User';
    const email = '@example.com';

    await registerPage.Register(name, email);
    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe(`Please enter a part followed by '@'. '@example.com' is incomplete.`);
  });

    //Bug - TC09
  // test.fail('TC9 - should show error for invalid email format (missing dot in domain)', async ({ page }) => {
  //   const name = 'Test User';
  //   const email = 'invalidemail@examplecom';
    
  //   await registerPage.Register(name, email);
  //   const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
  //   expect(validationMessage).toBe(`Please enter a part following '@'. 'invalidemail@examplecom' is incomplete.`);
  // });

  test('TC10 - should show error for invalid email format (consecutive dots)', async ({ page }) => {
    const name = 'Test User';
    const email = 'invalid@example..com';
    
    await registerPage.Register(name, email);
    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe(`'.' is used at a wrong position in 'example..com'.`);
  });  

  test('TC11 - should show error for invalid email format (dot at the end)', async ({ page }) => {
    const name = 'Test User';
    const email = 'invalid@example.com.';
    
    await registerPage.Register(name, email);
    const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toBe(`'.' is used at a wrong position in 'example.com.'.`);
  });


   //Bug - TC12
  // test.fail('TC12 - should show error for invalid email format (dot at the beginning)', async ({ page }) => {
  //   const name = 'Test User';
  //   const email = '.invalid@.example.com';
    
  //   await registerPage.Register(name, email);
  //   const validationMessage = await page.locator('[data-qa="signup-email"]').evaluate(el => (el as HTMLInputElement).validationMessage);
  //   expect(validationMessage).toBe(`'.' is used at a wrong position in '.example.com'.`);
  // });


  
});