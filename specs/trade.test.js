let loginActions = require('../actions/authActions');
let tradeActions = require('../actions/tradeActions');
let walletActions = require('../actions/walletActions');
let orderActions = require('../actions/orderActions');
let orderBookActions = require('../actions/orderBookActions');
const getConfig = require("../config/configs");
const {testLoginEmail, randomNumberInRange, OrderTypes} = require("../utils/util");

const config = getConfig();

describe('tradeTest', () => {
    beforeAll(async () => {
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        });
        loginActions = await loginActions(page, config);
        await testLoginEmail(config.user.username, config.user.password, loginActions, page);

        tradeActions = await tradeActions(page, config);
        walletActions = await walletActions(page, config);
        orderActions = await orderActions(page, config);
        orderBookActions = await orderBookActions(page, config);
    });

    const {price: orderBookPriceIndex , amount: orderBookAmountIndex, total: orderBookTotalIndex} = config.orderBook.bodyStructure;
    const {takerOrdersWeight, makerOrdersWeight, firstMakerOrderWeight, walletAccuracy, makerPricePercent} = config;

    for (const pair of config.pairs) {
        jest.setTimeout(120000)
        it('Should buy token then check it in orders then check with wallet ', async () => {
            const tokens = pair.split('_');

            const lowestSellOrder = (await orderBookActions.getSalesPricesByMarket(pair)).at(-1);
            const highestBuyOrder = (await orderBookActions.getBuysPricesByMarket(pair)).at(1);
            const lowestSellPrice = lowestSellOrder.at(orderBookPriceIndex);
            const highestBuyPrice = highestBuyOrder.at(orderBookPriceIndex)
            const orderTypeWeight = randomNumberInRange(0,100);

            if(orderTypeWeight <= takerOrdersWeight) {
                //Set Market Order
                let toBuyTokenWalletBeforeOrder = await walletActions.getWallet(tokens[0]);
                console.log('before wall', toBuyTokenWalletBeforeOrder)
                let {buyAmount, takerFee} = await tradeActions.uiMarketBuyToken(pair);
                buyAmount = buyAmount - (buyAmount * takerFee / 100);

                console.log('buy amount', buyAmount)

                await page.waitForTimeout(10000);

                const toBuyTokenWalletAfterOrder = await walletActions.getWallet(tokens[0]);
                console.log('after order', toBuyTokenWalletAfterOrder);


                const expectedBoughtAmount = toBuyTokenWalletBeforeOrder.assets + buyAmount;
                const allAssetsAfterOrder = toBuyTokenWalletAfterOrder.assets;
                const amountDiffPercent = (Math.abs(allAssetsAfterOrder - expectedBoughtAmount) / ((allAssetsAfterOrder + expectedBoughtAmount) / 2)) * 100;
                console.log(amountDiffPercent)
                await page.waitForTimeout(1000);

                console.log('pair', pair)
                await tradeActions.uiMarketSellToken(pair);
                expect(amountDiffPercent).toBeLessThanOrEqual(walletAccuracy);

            } else if (orderTypeWeight > takerOrdersWeight && orderTypeWeight <= makerOrdersWeight) {
                //Set limit Order
                const makerOrderWeight = randomNumberInRange(0,100);
                let buyPrice;

                if(makerOrderWeight <= firstMakerOrderWeight) {
                    buyPrice = randomNumberInRange(highestBuyPrice, lowestSellPrice);
                } else {
                    buyPrice = Math.round(lowestSellPrice - (lowestSellPrice * makerPricePercent));
                }

                console.log({buyPrice, pair})
                await tradeActions.uiLimitBuyToken(pair,buyPrice);

                await page.waitForTimeout(config.orderCompleteTime);

                const existingOrders = await orderActions.getLastOrderByMarketAndTypeBtn(pair, OrderTypes.OPEN_ORDERS);
                if(existingOrders.length > 0) {
                    await orderActions.cancelAllOpenOrdersByMarket(pair)
                } else {
                    await tradeActions.uiMarketSellToken(pair);
                }
            }
        });
    }
});
