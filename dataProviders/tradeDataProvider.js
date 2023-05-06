const {persianNumberToEnglish} = require("../utils/util");

class TradeDataProvider {
    constructor( page, config ) {
        this.page = page
        this.config = config
    }

    async uiMarketBuyToken(market) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForNavigation();

            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.orderBtn);
            const marketOrderBtn = await this.page.$x(this.config.tradeDomElements.marketOrder.orderBtn)
            await marketOrderBtn[0].click()

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.buy.amountBar );
            const buyAmountBar = await this.page.$x(this.config.tradeDomElements.marketOrder.buy.amountBar)
            await buyAmountBar[0].click()

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.buy.amountField );
            let buyAmount = await this.page.$x(this.config.tradeDomElements.marketOrder.buy.amountField)
            buyAmount = await this.page.evaluate(el => el.getAttribute('value'), buyAmount[0])

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.buy.purchaseBtn );
            const purchaseBtn = await this.page.$x(this.config.tradeDomElements.marketOrder.buy.purchaseBtn);
            await purchaseBtn[0].click()
            await this.page.waitForTimeout(2000);

            await this.page.goto( this.config.routes.url + this.config.routes.dashboardPath);
            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.generalElements.takerFeeElement);
            let takerFee = await this.page.$x(this.config.generalElements.takerFeeElement);
            takerFee = await this.page.evaluate(el => el.textContent, takerFee[0]);

            const tradeDataOutput = {
                buyAmount: persianNumberToEnglish(buyAmount),
                takerFee: persianNumberToEnglish(takerFee)
            }

            return tradeDataOutput
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async uiMarketSellToken(market) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForNavigation();

            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.orderBtn);
            const marketOrderBtn = await this.page.$x(this.config.tradeDomElements.marketOrder.orderBtn)
            await marketOrderBtn[0].click()

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.sell.amountBar );
            const sellAmountBar = await this.page.$x(this.config.tradeDomElements.marketOrder.sell.amountBar);
            await sellAmountBar[0].click();

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.marketOrder.sell.amountField);
            let sellAmount = await this.page.$x(this.config.tradeDomElements.marketOrder.sell.amountField)
            sellAmount = await this.page.evaluate(el => el.getAttribute('value'), sellAmount[0])

            await this.page.waitForTimeout(1000);
            const sellBtn = await this.page.$x(this.config.tradeDomElements.marketOrder.sell.sellBtn)
            await sellBtn[0].click()
            await this.page.waitForTimeout(2000);

            await this.page.goto( this.config.routes.url + this.config.routes.dashboardPath);
            await this.page.waitForNavigation();

            await this.page.waitForXPath( this.config.generalElements.takerFeeElement);

            let takerFee = await this.page.$x(this.config.generalElements.takerFeeElement);
            takerFee = await this.page.evaluate(el => el.textContent, takerFee[0]);

            await this.page.waitForTimeout(3000);
            const tradeDataOutput = {
                sellAmount: persianNumberToEnglish(sellAmount),
                takerFee: persianNumberToEnglish(takerFee)
            }

            return tradeDataOutput
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async uiLimitBuyToken(market, limitPrice) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.marketPath + market);
            await this.page.waitForTimeout(5000);

            await this.page.waitForXPath( this.config.tradeDomElements.limitOrder.orderBtn);
            const limitOrderBtn = await this.page.$x(this.config.tradeDomElements.limitOrder.orderBtn)
            await limitOrderBtn[0].click()

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.limitOrder.buy.priceField);
            const priceField = await this.page.$x(this.config.tradeDomElements.limitOrder.buy.priceField)
            await priceField[0].type(JSON.stringify(limitPrice));

            await this.page.waitForTimeout(1000);
            await this.page.waitForXPath( this.config.tradeDomElements.limitOrder.buy.amountBar);
            const amountBar = await this.page.$x(this.config.tradeDomElements.limitOrder.buy.amountBar)
            await amountBar[0].click()

            await this.page.waitForXPath( this.config.tradeDomElements.limitOrder.buy.amountField );
            let buyAmount = await this.page.$x(this.config.tradeDomElements.limitOrder.buy.amountField)
            await this.page.waitForTimeout(1000);
            buyAmount = await this.page.evaluate(el => el.getAttribute('value'), buyAmount[0])

            await this.page.waitForTimeout(1000);
            const priceAmount = await this.page.evaluate(el => el.getAttribute('value'), priceField[0])

            await this.page.waitForTimeout(1000);
            const purchaseBtn = await this.page.$x(this.config.tradeDomElements.limitOrder.buy.purchaseBtn)
            await purchaseBtn[0].click()
            await this.page.waitForTimeout(2000);

            await this.page.goto( this.config.routes.url + this.config.routes.dashboardPath);
            await this.page.waitForTimeout(5000);

            await this.page.waitForXPath( this.config.generalElements.takerFeeElement);

            let takerFee = await this.page.$x(this.config.generalElements.takerFeeElement);
            takerFee = await this.page.evaluate(el => el.textContent, takerFee[0]);

            const tradeDataOutput = {
                buyAmount: persianNumberToEnglish(buyAmount),
                takerFee: persianNumberToEnglish(takerFee),
                priceAmount: persianNumberToEnglish(priceAmount),
            }

            return tradeDataOutput
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }
}

module.exports = ( page, config ) => new TradeDataProvider( page, config);