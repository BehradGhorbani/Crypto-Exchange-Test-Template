const authDataProvider = require('../dataProviders/authDataProvider');
const {ScrapeModes} = require("../utils/util");


class AuthActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.authDataProvider = authDataProvider(page, config)
    }

    async login(username, password) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.authDataProvider.uiLogin(username, password);
        }
    }
}
module.exports = ( page, config ) => new AuthActions( page, config );