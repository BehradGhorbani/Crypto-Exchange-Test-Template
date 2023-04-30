const authDataProvider = require('../dataProviders/authDataProvider');
const {TestModes} = require("../utils/util");


class AuthActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.authDataProvider = authDataProvider(page, config)
    }

    async login(username, password) {
        if (this.config.mode === TestModes.Ui) {
            return await this.authDataProvider.uiLogin(username, password);
        }
    }
}

module.exports = ( page, config ) => new AuthActions( page, config );