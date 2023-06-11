module.exports = {
    launch: {
        headless: false,
        args: ["--window-size=1366,768"],
    },
    browser: 'chromium',
};

async function puppeteerOutPut(puppeteer){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return {
        page,
        browser
    }
}