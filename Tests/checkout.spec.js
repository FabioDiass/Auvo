const { test, expect } = require('@playwright/test');

test.describe('Checkout Page Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(/inventory.html/);

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');
    });

    test('Finalizar checkout com sucesso', async ({ page }) => {
        await page.fill('[data-test="firstName"]', 'Fabio');
        await page.fill('[data-test="lastName"]', 'Dias');
        await page.fill('[data-test="postalCode"]', '12243-280');
        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
        const confirmationMessage = await page.locator('.complete-header');
        await expect(confirmationMessage).toHaveText('Thank you for your order!');
    });

    test('Validar erro ao deixar campos obrigatórios em branco', async ({ page }) => {
        await page.click('[data-test="continue"]');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toHaveText('Error: First Name is required');
    });

    test('Erro ao preencher apenas o primeiro nome', async ({ page }) => {
        await page.fill('[data-test="firstName"]', 'Fabio');
        await page.click('[data-test="continue"]');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toHaveText('Error: Last Name is required');
    });

    test('Erro ao preencher sem o CEP', async ({ page }) => {
        await page.fill('[data-test="firstName"]', 'Fabio');
        await page.fill('[data-test="lastName"]', 'Dias');
        await page.click('[data-test="continue"]');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toHaveText('Error: Postal Code is required');
    });

    test('Validar resumo do pedido antes de finalizar', async ({ page }) => {
        await page.fill('[data-test="firstName"]', 'Fabio');
        await page.fill('[data-test="lastName"]', 'Dias');
        await page.fill('[data-test="postalCode"]', '12243-280');
        await page.click('[data-test="continue"]'); 
        const itemTotal = await page.locator('.summary_subtotal_label').textContent();
        const tax = await page.locator('.summary_tax_label').textContent();
        const total = await page.locator('.summary_total_label').textContent();
        expect(itemTotal).toContain('Item total:');
        expect(tax).toContain('Tax:');
        expect(total).toContain('Total:');
    });

    test('Cancelar o checkout e voltar para o carrinho', async ({ page }) => {
        await page.click('[data-test="cancel"]');
        await expect(page).toHaveURL(/cart.html/);
    });
});
