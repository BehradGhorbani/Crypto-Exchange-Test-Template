const {persianNumberToEnglish, tableDataScraper} = require("../utils/util");

class OrdersDataProvider {
    constructor( page, config ) {
        this.page = page
        this.config = config
    }

    async uiGetLastOrderByMarketAndTypeBtn(market, type) {
        try {
            console.log(type)
            await this.page.goto(this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForTimeout(3000);

            await this.page.waitForXPath(this.config.ordersTableElements[type].orderBtn);
            const orderTypeBtn = await this.page.$x(this.config.ordersTableElements[type].orderBtn);
            await orderTypeBtn[0].click();

            const tBody = await this.page.$x(this.config.ordersTableElements[type].body)

            const ordersFirstPage = [];
            if (tBody.length) {
                let pureData = (await tableDataScraper(this.config.ordersTableElements[type].body)).map(data => {
                        const convertedData =  persianNumberToEnglish(data);
                        if(convertedData) {
                            return convertedData
                        }
                });

                while (pureData.length) {
                    ordersFirstPage.push(pureData.splice(0, this.config.ordersTableElements[type].columnLength))
                }
            }
            return ordersFirstPage;
        } catch (err) {
            console.log('error => ', err);
        }
    }

    async uiCancelAllOpenOrdersByMarket(market) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForTimeout(3000);

            await this.page.waitForXPath(this.config.ordersTableElements.openOrders.orderBtn);
            const openOrdersBtn = await this.page.$x(this.config.ordersTableElements.openOrders.orderBtn);
            await openOrdersBtn[0].click();

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath(this.config.ordersTableElements.openOrders.cancelAllOrdersBtn);
            const cancelAllOrdersBtn = await this.page.$x(this.config.ordersTableElements.openOrders.cancelAllOrdersBtn);
            await cancelAllOrdersBtn[0].click();
            await this.page.waitForTimeout(2000);

            await this.page.waitForXPath(this.config.ordersTableElements.openOrders.confirmCancelBtn);
            const confirmCancelBtn = await this.page.$x(this.config.ordersTableElements.openOrders.confirmCancelBtn);
            await confirmCancelBtn[0].click();
            await this.page.waitForTimeout(2000);

            return true;
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async apiGetWallet(pair) {
        return true;
    }
}

module.exports = ( page, config ) => new OrdersDataProvider( page, config );