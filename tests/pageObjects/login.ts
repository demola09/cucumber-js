import {WebDriver, ByHash} from 'selenium-webdriver';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';

export class LoginPageObject extends SeleniumWebdriverWrapper {
  usernameBox: ByHash = {name: 'username'};
  clickNextButton: ByHash = {tagName: 'button'};
  passwordBox: ByHash = {xpath: '//body/app[1]/ng-component[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[4]/form[1]/div[1]/div[2]/div[1]/input[1]'};
  loginButton: ByHash = {xpath: "//div[contains(text(),'Log In')]"};
  loginResults: ByHash = {xpath: "//span[contains(text(),'My account')]"};

  constructor(driver: WebDriver) {
    super(driver);
  }

  inputUserEmailAndNext = async () => {
    await this.clearFormField(this.usernameBox);
    await this.setValue(this.usernameBox, 'test+user3662@levelten.energy');
    await this.click(this.clickNextButton);
  }

  inputPasswordAndLogin = async () => {
    await this.clearFormField(this.passwordBox);
    await this.setValue(this.passwordBox, 'Level10!')
    await this.click(this.loginButton);
  }
}
