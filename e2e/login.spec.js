
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {
    
    test('Login com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('Login com senha incorreta', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('standard_user', 'Senha-incorreta');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');
    });

    test('Login com usuário incorreto', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('user-incorreto', 'secret_sauce');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');
    });

    test('Login com campos em branco', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('', '');
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Username is required');
    });

    test('Logout com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        
        await expect(page).toHaveURL(/saucedemo.com/);
    });
});



