module.exports = domElements =  {
    exnovin: {
        tradeElements: {
            marketOrder: {
                orderBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/button[2]",
                buy: {
                    amountBar: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div[3]/div/div[3]/span[2]",
                    amountField: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div[2]/div/div[1]/div/div/div/div/input",
                    purchaseBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[2]/div[2]/button"
                },
                sell: {
                    amountBar: "//*[@id=\"SELL-form\"]/div[1]/div[3]/div/div[3]/span[5]",
                    amountField: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[2]/div/form/div[1]/div[2]/div/div[1]/div/div/div/div/input",
                    sellBtn: "//*[@id=\"SELL-form\"]/div[2]/div[2]/button",
                }
            },

            limitOrder: {
                orderBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/button[1]",
                buy: {
                    priceField: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div[2]/div[1]/div/div/div/div/div/input",
                    amountField: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div[2]/div[2]/div[1]/div/div/div/div/input",
                    amountBar: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[1]/div[3]/div/div[3]/span[2]",
                    purchaseBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/form/div[2]/div/button"
                }
            },
        },

        generalElements: {
            takerFeeElement: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div/div/div/div/ul[1]/li[3]/div/span/p[2]/text()[1]",
        },

        ordersTableElements: {
            orderHistory: {
                columnLength: 10,
                body: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody",
                orderBtn: "//*[@id=\"root\"]/main/div/div[1]/div/div[2]/div/div/div[2]/div[1]/div/button[2]",
                lastOrderValueField: "/html/body/[4]/main/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody/tr[1]/td[8]/p/text()[1]",
                lastOrderAmountField: "//*[@id=\"root\"]/main/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody/tr[1]/td[5]/p",
            },
            openOrders: {
                orderBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[2]/div[1]/div/button[1]",
                columnLength: 10,
                body: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody",
                cancelAllOrdersBtn: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div[1]/div[1]/button",
                confirmCancelBtn: "/html/body/div[3]/div/div/div[2]/button[2]"
            }
        },

        orderBook: {
            sales: {
                body: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[2]/div/div[1]/div[1]/table/tbody",
            },
            buys: {
                body: "/html/body/div[4]/main/div/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/div/div/table/tbody",
            },
            bodyStructure: {
                columnLength: 3,
                price: 0,
                amount: 1,
                total: 2
            }
        },

        walletElements: {
            assets: "//*[@id=\"root\"]/main/div/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/ul/li[1]/span/p[1]",
            reservedAssets: "//*[@id=\"root\"]/main/div/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/ul/li[3]/span/p[1]",
            availableAssets: "//*[@id=\"root\"]/main/div/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/ul/li[5]/span/p[1]"
        },

        loginElements: {
            usernameField: '//*[@id="username"]',
            passwordField: '//*[@id="password"]',
            loginPageBtn: '//*[@id="root"]/main/div/div/div[1]/div[3]/div/form/div[3]/button',
            profileUsername: '//*[@id="root"]/main/div/div[1]/div/div[2]/div/div[3]/div/div[1]/div/div[2]/ul/li[1]/p[2]'
        },
    },
}