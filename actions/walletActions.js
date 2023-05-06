const {ScrapeModes} = require("../utils/util");
const walletDataProvider = require('../dataProviders/walletDataProvider');

class WalletActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.walletDataProvider = walletDataProvider(page, config);
    }

    async getWallet(token) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.walletDataProvider.uiGetWallet(token);
        }
    }
}

module.exports = ( page, config ) => new WalletActions( page, config );