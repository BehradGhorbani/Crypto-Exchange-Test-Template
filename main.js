let getConfig = require("./config/configs");
let tradeScript = require('./scripts/trade');
const cron = require("node-cron");

try {
        const config = getConfig()
        tradeScript = new tradeScript(config)
        // cron.schedule("* * * * *", async () => {
            tradeScript.autoTrader(false)
        // });
} catch (e) {
        console.log(e);
}