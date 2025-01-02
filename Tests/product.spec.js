const { test, expect } = require('@playwright/test');

test.describe('Pagina de produtos', () => {
    
    test.beforeEach(async ({ page }) => {
        
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('Visualizar detalhes de um produto', async ({ page }) => {
        await page.click('.inventory_item:nth-child(1) .inventory_item_name');
        await expect(page.locator('.inventory_details_name')).toBeVisible();
        await expect(page.locator('.inventory_details_desc')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toBeVisible();
    });

    test('Adicionar produto ao carrinho', async ({ page }) => {
        await page.click('.inventory_item:nth-child(1) [data-test="add-to-cart-sauce-labs-backpack"]');
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });

    test('Remover produto do carrinho', async ({ page }) => {
        await page.click('.inventory_item:nth-child(1) [data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });

    test('Adicionar e verificar múltiplos produtos no carrinho', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('2');

        await page.click('.shopping_cart_link');
        const itemsInCart = await page.locator('.cart_item').count();
        await expect(itemsInCart).toBe(2);
    });

    test('Validar preço de um produto', async ({ page }) => {
        const price = await page.locator('.inventory_item:nth-child(1) .inventory_item_price').textContent();
        expect(price).toBe('$29.99');
    });
});
