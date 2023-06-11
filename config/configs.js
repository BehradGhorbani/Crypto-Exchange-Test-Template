const domElements = require('../config/domElements')
const {ScrapeModes} = require('../utils/util')
const pairs = require('./pairs')
const prompt = require('prompt-sync')()

const mainProject = "exnovin"

const configs = {
    exnovin : {
        mode: ScrapeModes.Ui,
        scriptLifeCycle: 50,
        routes: {
            url: "https://exnovin.irandax.com",
            marketPath: "/app/markets/",
            dashboardPath: "/app/dashboard/",
            loginPath: "/app/login/",
            profilePath: "/app/settings/profile",
            walletsPath: "/app/withdraw/",
        },

        pairs: pairs.exnovin,
        walletAccuracy: 0.08,
        takerOrdersWeightPercent: 100,
        firstMakerOrderWeight: 100,
        makerPricePercent: 0.005,
        orderCompleteTime: 60000,
        tradeDomElements: domElements.exnovin.tradeElements,
        loginDomElements: domElements.exnovin.loginElements,
        walletElements: domElements.exnovin.walletElements,
        ordersTableElements: domElements.exnovin.ordersTableElements,
        orderBook: domElements.exnovin.orderBook,
        generalElements: domElements.exnovin.generalElements,
        user: getCredentials(),
    },

    zarindax : {
        mode: ScrapeModes.Ui,
        scriptLifeCycle: 10,
        routes: {
            url: "https://trade.zarindax.com",
            marketPath: "/app/trade/",
            dashboardPath: "/app/dashboard/",
            loginPath: "/user/auth/static-password",
            profilePath: "/app/settings/profile",
            walletsPath: "/app/wallets/",
        },

        pairs: pairs.zarindax,
        walletAccuracy: 0.08,
        takerOrdersWeightPercent: 100,
        firstMakerOrderWeight: 100,
        makerPricePercent: 0.005,
        orderCompleteTime: 60000,
        tradeDomElements: domElements.zarindax.tradeElements,
        loginDomElements: domElements.zarindax.loginElements,
        walletElements: domElements.zarindax.walletElements,
        ordersTableElements: domElements.zarindax.ordersTableElements,
        orderBook: domElements.zarindax.orderBook,
        generalElements: domElements.zarindax.generalElements,
        user: getCredentials(),
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
