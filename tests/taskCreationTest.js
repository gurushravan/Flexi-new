const { Builder, By, until } = require('selenium-webdriver');

(async function taskCreationTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the login page and perform login
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.name('email')).sendKeys('nnlokhesh@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Lok081103#');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for the specific form to be present (you can refine the selector based on its context)
        await driver.wait(until.elementLocated(By.css('div.addContainer form')), 10000); // Assuming form is inside the 'addContainer' div
        
        // Now interact with the specific form inputs
        await driver.findElement(By.id('title')).sendKeys('New Selenium Task');
        await driver.findElement(By.id('description')).sendKeys('Test the desc for the New Selenium Task');
        
        // Click the submit button (ensure it's the right one)
        await driver.findElement(By.css('div.addContainer form button[type="submit"]')).click();

        // Navigate to the /active page
        await driver.get('http://localhost:3000/active');

        // Wait for the page to load and search for the task by title
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'New Selenium Task')]")), 10000);

        console.log('Task Creation Test Passed');
    } catch (error) {
        console.error('Task Creation Test Failed', error);
    } finally {
        await driver.quit();
    }
})();
