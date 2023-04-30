const {TestModes} = require("../utils/util");
const orderBookDataProvider = require('../dataProviders/orderBookDataProvider');

class OrderBookActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.orderBookDataProvider = orderBookDataProvider(page, config);
    }

    async getSalesPricesByMarket(market) {
        if (this.config.mode === TestModes.Ui) {
            return await this.orderBookDataProvider.uiGetSalesPricesByMarket(market);
        }
    }

    async getBuysPricesByMarket(market) {
        if (this.config.mode === TestModes.Ui) {
            return await this.orderBookDataProvider.uiGetBuysPricesByMarket(market);
        }
    }
}

module.exports = ( page, config ) => new OrderBookActions( page, config );