const persianjs = require("persianjs");
const {persianNumberToEnglish} = require("../utils/util");

class WalletDataProvider {
    constructor( page, config ) {
        this.page = page
        this.config = config
    }

    async uiGetWallet(token) {
        try {
            await this.page.goto( this.config.routes.url + this.config.routes.walletsPath + token);
            await this.page.waitForTimeout(5000);

            await this.page.waitForXPath( this.config.walletElements.assets);
            await this.page.waitForXPath( this.config.walletElements.reservedAssets);
            await this.page.waitForXPath( this.config.walletElements.availableAssets);

            let assets = await this.page.$x( this.config.walletElements.assets);
            assets = await this.page.evaluate( el =>  el.textContent, assets[0] );

            let reservedAssets = await this.page.$x( this.config.walletElements.reservedAssets);
            reservedAssets = await this.page.evaluate( el =>  el.textContent, reservedAssets[0] );

            let availableAssets = await this.page.$x( this.config.walletElements.availableAssets);
            availableAssets = await this.page.evaluate( el =>  el.textContent, availableAssets[0] );

            const walletValues = {
                assets: persianNumberToEnglish(assets),
                reservedAssets: persianNumberToEnglish(reservedAssets),
                availableAssets: persianNumberToEnglish(availableAssets)
            }

            return walletValues
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async apiGetWallet(pair) {
        return true;
    }
}

module.exports = ( page, config ) => new WalletDataProvider( page,config );