import { type Page, type Locator , expect } from '@playwright/test';
import { buildUrl } from '../utils/uiUrlBuilder';
import messages from '../utils/messages';
import baseUrl from '../utils/envBaseUrl';

class ApplicationForm {
  readonly page: Page;
  readonly formHeading: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly maleButton: Locator;
  readonly femaleButton: Locator;
  readonly otherButton: Locator;
  readonly phoneNumber: Locator;
  readonly dateOfBirth: Locator;
  readonly subject: Locator;
  readonly sportButton: Locator;
  readonly readingButton: Locator;
  readonly musicButton: Locator;
  readonly fileUpload: Locator;
  readonly address: Locator;
  readonly stateDropDown: Locator;
  readonly cityDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formHeading = page.getByRole('heading', { name: 'Student Registration Form', level: 5 });
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.email = page.getByRole('textbox', { name: 'name@example.com' });
    this.maleButton = page.getByRole('radio', { name: 'Male'})
    this.femaleButton = page.getByRole('radio', { name: 'Female'})
    this.otherButton = page.getByRole('radio', { name: 'Other'})
    this.phoneNumber = page.getByRole('textbox', { name: 'Mobile Number' })
    this.dateOfBirth = page.locator('#dateOfBirthInput');
    this.subject = page.locator('#react-select-5-live-region');
    this.subject = page.locator('#react-select-5-live-region');
    this.sportButton = page.getByRole('radio', { name: 'Sport' })
    this.readingButton = page.getByRole('radio', { name: 'Reading' })
    this.musicButton = page.getByRole('radio', { name: 'Music'})
    this.fileUpload = page.locator('#uploadPicture');
    this.address = page.locator('#currentAddress');
    this.stateDropDown = page.locator('#react-select-6-placeholder');
    this.cityDropDown = page.locator('#react-select-7-placeholder');
  }

  async goto() {
    const env = process.env.ENV;
    const targetUrl = buildUrl('form');
    console.log(`GO TO BOOK URL: ${baseUrl[env].home + targetUrl}`)
    await this.page.goto(baseUrl[env].home + targetUrl);
  }

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }
}

export default ApplicationForm
