const { Builder, By, until } = require('selenium-webdriver');

(async function taskCompletionTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/login');
        // Perform login steps
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('testpassword');
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        await driver.wait(until.elementLocated(By.css('.task-list')), 10000);
        await driver.findElement(By.css('input[type="checkbox"]')).click();
        console.log('Task Completion Test Passed');
    } catch (error) {
        console.error('Task Completion Test Failed', error);
    } finally {
        await driver.quit();
    }
})();
