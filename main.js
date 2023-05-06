let getConfig = require("./config/configs");
let tradeScript = require('./scripts/trade');
const cron = require("node-cron");

try {
        const config = getConfig()
        tradeScript = new tradeScript(config)

        cron.schedule("*/3 * * * *", async () => {
                await tradeScript.autoTrader()
        });

} catch (e) {
        console.log(e)
}