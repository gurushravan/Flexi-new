const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('nnlokhesh@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Lok081103#');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.elementLocated(By.xpath(`//span[text()='Narasimha Lokhesh Nidadavole']`)), 10000);
        console.log('Login Test Passed');
    } catch (error) {
        console.error('Login Test Failed', error);
    } finally {
        await driver.quit();
    }
})();
