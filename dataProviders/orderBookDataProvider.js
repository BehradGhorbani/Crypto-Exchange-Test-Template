const {persianNumberToEnglish, tableDataScraper} = require("../utils/util");

class OrderBookDataProvider {
    constructor( page, config ) {
        this.page = page
        this.config = config
    }

    async uiGetSalesPricesByMarket(market) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForTimeout(5000)

            await this.page.waitForXPath(this.config.orderBook.sales.body)
            await this.page.waitForTimeout(5000);

            const orderBook = [];
            let pureData = (await tableDataScraper(this.config.orderBook.sales.body)).map(data => persianNumberToEnglish(data));

            while (pureData.length) {
                orderBook.push(pureData.splice(0,this.config.orderBook.bodyStructure.columnLength))
            }
            return orderBook;
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async uiGetBuysPricesByMarket(market) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForTimeout(5000)

            await this.page.waitForXPath(this.config.orderBook.buys.body)
            await this.page.waitForTimeout(5000)

            const orderBook = [];
            let pureData = (await tableDataScraper(this.config.orderBook.buys.body)).map(data => persianNumberToEnglish(data));

            while (pureData.length) {
                orderBook.push(pureData.splice(0,3))
            }
            
            return orderBook;
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }
}

module.exports = ( page, config ) => new OrderBookDataProvider( page, config );