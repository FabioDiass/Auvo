const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../Pages/ProductsPage');

test('Deve filtrar produtos por preço (High para Low)', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Filtragem
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToProducts();
    await productsPage.applyFilter('hilo'); // Filtro "Price (high to low)"
    await productsPage.validateSortedProducts();
});

test('Deve filtrar produtos por preço (Low para High)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Filtragem
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToProducts();
    await productsPage.applyFilter('lohi'); // Filtro "Price (low to high)"
    await productsPage.validateSortedProducts();
});

test('Deve filtrar produtos por preço (A para Z)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Filtragem
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToProducts();
    await productsPage.applyFilter('az'); // Filtro "Price (De A a Z)"
    await productsPage.validateSortedProducts();
});

test('Deve filtrar produtos por preço (Z para A)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Filtragem
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToProducts();
    await productsPage.applyFilter('za'); // Filtro "Price (De A a Z)"
    await productsPage.validateSortedProducts();
});