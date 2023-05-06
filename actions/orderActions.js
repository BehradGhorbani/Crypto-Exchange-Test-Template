const {ScrapeModes} = require("../utils/util");
const orderDataProvider = require('../dataProviders/orderDataProvider');

class OrdersActions {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
        this.orderDataProvider = orderDataProvider(page, config);
    }

    async getLastOrderByMarketAndTypeBtn(market,type) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.orderDataProvider.uiGetLastOrderByMarketAndTypeBtn(market, type);
        }
    }

    async cancelAllOpenOrdersByMarket(market) {
        if (this.config.mode === ScrapeModes.Ui) {
            return await this.orderDataProvider.uiCancelAllOpenOrdersByMarket(market);
        }
    }
}

module.exports = ( page, config ) => new OrdersActions( page, config );