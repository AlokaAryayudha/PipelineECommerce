import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly buttonSignUpDashboard: Locator;
  readonly inputName: Locator;
  readonly inputEmail: Locator;
  readonly buttonSignUp: Locator;


  constructor(page: Page) {
    this.page = page;
    this.buttonSignUpDashboard = page.locator('a[href="/login"]')
    this.inputName = page.locator('[data-qa="signup-name"]')
    this.inputEmail = page.locator('[data-qa="signup-email"]')
    this.buttonSignUp = page.locator('[data-qa="signup-button"]')
  }

  
    async NavigateToRegisterPage() {
        await this.buttonSignUpDashboard.click();
    }

    async FillRegisterForm(name: string, email: string) {
        await this.inputName.fill(name);
        await this.inputEmail.fill(email);
    }
    
    async SubmitRegisterForm() {
        await this.buttonSignUp.click();
    }
    
    async Register(name: string, email: string) {
        await this.NavigateToRegisterPage();
        await this.FillRegisterForm(name, email);
        await this.SubmitRegisterForm();
    }

}
