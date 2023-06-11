let loginActions = require("../actions/authActions");
let {randomNumberInRange, OrderTypes, TRADE_TYPE} = require("../utils/util");
let tradeActions = require("../actions/tradeActions");
let walletActions = require("../actions/walletActions");
let orderActions = require("../actions/orderActions");
let orderBookActions = require("../actions/orderBookActions");
let puppeteer = require('puppeteer');

class TradeScript {
    constructor(config) {
        this.config = config;
    }

    async autoTrader(testMode) {
        this.testMode = testMode;
        this.browser = await puppeteer.launch({headless: false, slowMo: 0})
        this.page = await this.browser.newPage()
        this.loginActions = await loginActions(this.page, this.config);
        this.tradeActions = await tradeActions(this.page, this.config);
        this.walletActions = await walletActions(this.page, this.config);
        this.orderActions = await orderActions(this.page, this.config);
        this.orderBookActions = await orderBookActions(this.page, this.config);

        await this.page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        });
        // await this.page.setDefaultNavigationTimeout(60000)

        await this.loginActions.login(this.config.user.username, this.config.user.password);

        const {
            price: orderBookPriceIndex,
            amount: orderBookAmountIndex,
            total: orderBookTotalIndex
        } = this.config.orderBook.bodyStructure;

        const {
            takerOrdersWeightPercent,
            firstMakerOrderWeight,
            walletAccuracy,
            makerPricePercent
        } = this.config;

        const tradeData = []

        for (let i = 0  ;i < this.config.scriptLifeCycle; i++) {
            console.log('iteration ' + i)
            for (const pair of this.config.pairs) {
                console.log(pair)
                const tokens = pair.split('_');

                const lowestSellOrder = (await this.orderBookActions.getSalesPricesByMarket(pair)).at(-1);
                const highestBuyOrder = (await this.orderBookActions.getBuysPricesByMarket(pair)).at(1);
                const lowestSellPrice = lowestSellOrder.at(orderBookPriceIndex);
                const highestBuyPrice = highestBuyOrder.at(orderBookPriceIndex);
                const orderTypeWeight = randomNumberInRange(0, 100);

                if (orderTypeWeight <= takerOrdersWeightPercent) {
                    //Set Market Order
                    let toBuyTokenWalletBeforeOrder = this.testMode && await this.walletActions.getWallet(tokens[0]);
                    let {buyAmount, takerFee} = await this.tradeActions.uiMarketBuyToken(pair);
                    if (this.testMode) {
                        buyAmount = buyAmount - (buyAmount * takerFee / 100);

                        await this.page.waitForTimeout(10000);

                        const toBuyTokenWalletAfterOrder = await this.walletActions.getWallet(tokens[0]);

                        const expectedBoughtAmount = toBuyTokenWalletBeforeOrder.assets + buyAmount;
                        const allAssetsAfterOrder = toBuyTokenWalletAfterOrder.assets;
                        const amountDiffPercent = (Math.abs(allAssetsAfterOrder - expectedBoughtAmount) / ((allAssetsAfterOrder + expectedBoughtAmount) / 2)) * 100;
                        await this.page.waitForTimeout(1000);

                        const marketResult = {
                            type: TRADE_TYPE.MARKET,
                            pair,
                            baseBuyAmount: buyAmount,
                            walletDifference: amountDiffPercent
                        }

                        tradeData.push(marketResult)
                    }
                    await this.tradeActions.uiMarketSellToken(pair);
                } else {
                    //Set limit Order
                    const makerOrderWeight = randomNumberInRange(0, 100);
                    let buyPrice;

                    if (makerOrderWeight <= firstMakerOrderWeight) {
                        buyPrice = randomNumberInRange(highestBuyPrice, lowestSellPrice);
                    } else {
                        buyPrice = Math.round(lowestSellPrice - (lowestSellPrice * makerPricePercent));
                    }

                    await this.tradeActions.uiLimitBuyToken(pair, buyPrice);

                    await this.page.waitForTimeout(this.config.orderCompleteTime);

                    const existingOrders = await this.orderActions.getLastOrderByMarketAndTypeBtn(pair, OrderTypes.OPEN_ORDERS);
                    if (existingOrders.length > 0) {
                        await this.orderActions.cancelAllOpenOrdersByMarket(pair);
                    } else {
                        await this.tradeActions.uiMarketSellToken(pair);
                    }

                    if (this.testMode) {
                        const limitResult = {
                            type: TRADE_TYPE.LIMIT,
                            pair,
                            lowestSellPrice,
                            highestBuyPrice
                        };
                        tradeData.push(limitResult);
                    }
                }
            }
        }
        // await this.page.close();
        // await this.browser.close();
        return tradeData
    }
}

module.exports = TradeScript