class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = page.locator('#first-name');
      this.lastNameInput = page.locator('#last-name');
      this.postalCodeInput = page.locator('#postal-code');
      this.continueButton = page.locator('.cart_button');
      this.finishButton = page.locator('.cart_button'); 
    }
  
    async fillCheckoutDetails(firstName, lastName, postalCode) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
      await this.continueButton.click();
    }
  
    async finishCheckout() {
      await this.finishButton.click();
    }
  }
  
  module.exports = CheckoutPage;