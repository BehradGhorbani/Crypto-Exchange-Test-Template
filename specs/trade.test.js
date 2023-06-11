let tradeScript = require('../scripts/trade');
let getConfig = require("../config/configs");
const {TRADE_TYPE} = require("../utils/util");

jest.setTimeout(180000);
describe('tradeTest', () => {
    let tradeTestData;
    let walletAccuracy;
    beforeAll(async () => {
        const config = getConfig()
        tradeScript = new tradeScript(config);
        tradeTestData = await tradeScript.autoTrader(config, true);
        walletAccuracy = config.walletAccuracy;
    });

        it('Should buy token then check it in orders then check with wallet ', async () => {
            for (let data of tradeTestData) {
                if (data.type && data.type === TRADE_TYPE.MARKET) {
                    expect(data.walletDifference).toBeLessThanOrEqual(walletAccuracy);
                }
            }
        })
});
