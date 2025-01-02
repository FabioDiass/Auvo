const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = 'select[data-test="product-sort-container"]'; 
        this.productList = '.inventory_item';
    }

    async navigateToProducts() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
        await this.page.waitForSelector(this.sortDropdown); // Aguarda o dropdown estar visível.
    }

    async applyFilter(optionValue) {
        //await this.page.selectOption('[data-test="product-sort-container"]', 'az');
        await this.page.selectOption(this.sortDropdown, optionValue);
    }

    async validateSortedProducts() {
        const prices = await this.page.locator('.inventory_item_price').allInnerTexts();
        const sortedPrices = [...prices].sort((a, b) => parseFloat(b) - parseFloat(a)); // Ordenação de "high to low".
        expect(prices).toEqual(sortedPrices); // Valida se os preços estão ordenados corretamente.
    }
    
}

module.exports = { ProductsPage };



