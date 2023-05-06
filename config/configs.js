const domElements = require('../config/domElements')
const {ScrapeModes} = require('../utils/util')
const pairs = require('./pairs')
const prompt = require('prompt-sync')()

const mainProject = "exnovin"

const configs = {
    exnovin : {
        mode: ScrapeModes.Ui,
        routes: {
            url: "https://exnovin.io",
            marketPath: "/app/markets/",
            dashboardPath: "/app/dashboard/",
            loginPath: "/app/login/",
            profilePath: "/app/settings/profile",
            walletsPath: "/app/withdraw/",
        },

        pairs: pairs.exnovin,
        walletAccuracy: 0.08,
        takerOrdersWeightPercent: 50,
        firstMakerOrderWeight: 100,
        makerPricePercent: 0.005,
        orderCompleteTime: 60000,
        tradeDomElements: domElements.exnovin.tradeElements,
        loginDomElements: domElements.exnovin.loginElements,
        walletElements: domElements.exnovin.walletElements,
        ordersTableElements: domElements.exnovin.ordersTableElements,
        orderBook: domElements.exnovin.orderBook,
        generalElements: domElements.exnovin.generalElements,
        user: {username: "behradbh128@irandax.com", password: "behradGH1383!"},
    },
}


function getCredentials() {
    return {
        username: prompt('Enter Username: '),
        password: prompt('Enter Password: '),
    }
}
module.exports = getConfig = () => {
    return configs[mainProject];
}