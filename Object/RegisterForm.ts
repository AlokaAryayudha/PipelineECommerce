import { Page, Locator } from '@playwright/test';

export class RegisterFormPage {
    readonly page: Page;
    readonly tittleMr : Locator;
    readonly tittleMrs : Locator;
    readonly nameInput : Locator;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly dayOfBirth : Locator;
    readonly monthOfBirth : Locator;
    readonly yearOfBirth : Locator;
    readonly newsletterCheckbox : Locator;
    readonly specialOfferCheckbox : Locator;

    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly companyInput : Locator;
    readonly address1Input : Locator;
    readonly address2Input : Locator;
    readonly countrySelect : Locator;
    readonly stateInput : Locator;
    readonly cityInput : Locator;
    readonly zipcodeInput : Locator;
    readonly mobileNumberInput : Locator;
    readonly createAccountButton : Locator; 

    constructor(page: Page) {
        // Title
        this.tittleMr = page.locator('#id_gender1');
        this.tittleMrs = page.locator('#id_gender2');

        // Account Info
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.passwordInput = page.locator('[data-qa="password"]');

        // Date of Birth
        this.dayOfBirth = page.locator('[data-qa="days"]');
        this.monthOfBirth = page.locator('[data-qa="months"]');
        this.yearOfBirth = page.locator('[data-qa="years"]');

        // Checkboxes
        this.newsletterCheckbox = page.locator('[data-qa="newsletter"]');
        this.specialOfferCheckbox = page.locator('[data-qa="optin"]');

        // Address Info — inspect dulu untuk pastikan locator-nya
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');

        // Button
        this.createAccountButton = page.locator('[data-qa="create-account"]');
    }

    


}