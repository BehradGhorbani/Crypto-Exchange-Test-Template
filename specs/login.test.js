let loginActions = require('../actions/authActions');
const getConfig = require("../config/configs");
const {testLoginEmail} = require("../utils/util");

jest.setTimeout(60000);
const config = getConfig();

describe('Login test', () => {
    beforeAll(async () => {
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        });

        loginActions = loginActions(page, config);
    });

    it('Should be able to log in account creation', async () => {
        await testLoginEmail('behradbh128@irandax.com', 'behradGH1383!', loginActions, page);
    });

});