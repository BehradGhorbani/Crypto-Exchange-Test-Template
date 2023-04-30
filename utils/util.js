const persianjs = require("persianjs");

const TestModes = {
    Ui: "Ui",
    Api: "Api",
}

const OrderTypes = {
    OPEN_ORDERS: "openOrders",
    ORDER_HISTORY: "orderHistory",
}

async function testLoginEmail(username, password, loginActions, page) {
    const webEmail = await loginActions.login(username, password);
    await page.waitForTimeout(1000);
    expect(username).toContain(webEmail);
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function persianNumberToEnglish(persianNumber) {
    return parseFloat(persianjs(persianNumber).persianNumber().toString().replaceAll('٬',''));
}

async function tableDataScraper(tableBody) {
    const orderRows = await this.page.$x(tableBody);
    let columns = await orderRows[0].$$('td');
    return (await Promise.all(columns.map(async column => await column.evaluate(el => el.textContent)))).filter(data => data != "");
}
module.exports = {OrderTypes, TestModes, testLoginEmail, persianNumberToEnglish, tableDataScraper, randomNumberInRange}