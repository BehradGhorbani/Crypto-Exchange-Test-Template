const {ScrapeModes} = require("../utils/util");
const tradeDataProvider = require('../dataProviders/tradeDataProvider');

class TradeActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.tradeDataProvider = tradeDataProvider(page, config);
    }

    async uiMarketBuyToken(market) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.tradeDataProvider.uiMarketBuyToken(market);
        }
    }

    async uiMarketSellToken(market) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.tradeDataProvider.uiMarketSellToken(market);
        }
    }

    async uiLimitBuyToken(market, limitPrice) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.tradeDataProvider.uiLimitBuyToken(market,limitPrice);
        }
    }
}

module.exports = ( page, config ) => new TradeActions( page, config );