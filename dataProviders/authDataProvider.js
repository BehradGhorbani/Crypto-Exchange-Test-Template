class AuthDataProvider {
    constructor( page, config ) {
        this.page = page;
        this.config = config;
    }

    async uiLogin(username, password ) {
        try {

            await this.page.goto( this.config.routes.url + this.config.routes.loginPath );
            await page.waitForTimeout(5000);

            await this.page.waitForXPath( this.config.loginDomElements.usernameField );
            const usernameField = await page.$x(this.config.loginDomElements.usernameField)
            await usernameField[0].type(username)

            const passwordField = await page.$x(this.config.loginDomElements.passwordField)
            await passwordField[0].type(password)

            const loginPageBtn = await page.$x(this.config.loginDomElements.loginPageBtn)
            await loginPageBtn[0].click()
            await page.waitForTimeout(2000);

            await this.page.goto(this.config.routes.url + this.config.routes.profilePath)
            await this.page.waitForXPath(this.config.loginDomElements.profileUsername);

            const profileUsername = await page.$x(this.config.loginDomElements.profileUsername)
            const email = await this.page.evaluate(el =>  el.textContent, profileUsername[0] );

            return email;
        } catch ( err ) {
            console.log( 'error => ', err);
        }
    }

    async apiLogin() {
        return true;
    }
}

module.exports = ( page, config ) => new AuthDataProvider( page, config );