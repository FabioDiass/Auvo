const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.searchBar = 'input[data-test="search-bar"]'; // Ajuste conforme o seletor real.
        this.productList = '.inventory_item'; // Ajuste conforme o seletor real.
    }

    async navigateToProducts() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchBar, productName);
        await this.page.press(this.searchBar, 'Enter'); 
    }

    async validateSearchResults(expectedProduct) {
        const products = await this.page.locator(this.productList).allInnerTexts();
        expect(products.some(product => product.includes(expectedProduct))).toBeTruthy();
    }
}

module.exports = { ProductsPage };
