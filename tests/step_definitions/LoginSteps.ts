import {When, Before, Then, World} from 'cucumber';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';
import {stepTimeOut} from '../support/timeouts';
import {targetUrl} from '../support/env';
import {browserName} from '../support/hooks';
import {supportedBrowserNames} from '../support/supportedBrowserNames';
import {Constants} from '../support/constants';
import {LoginPageObject} from '../pageObjects/login';
import {assert} from 'chai';

let driver: any;
let driverWrapper: SeleniumWebdriverWrapper;
let loginPage: LoginPageObject;

Before({timeout: stepTimeOut}, async function(this: World) {
  driver = this.driver;
  driverWrapper = new SeleniumWebdriverWrapper(driver);
  loginPage = new LoginPageObject(driver);

  if (browserName !== supportedBrowserNames.safari) {
    await driverWrapper.setScreenSize(Constants.adjustScreenWidth, Constants.adjustScreenHeight);
  } else {
    await driverWrapper.maximizeWindow();
  }

  await driverWrapper.getUrl(targetUrl);
});

When(/^I enter my username and password$/, async () => {
  await loginPage.inputUserEmailAndNext();
  await driverWrapper.waitUntilElementLoadedAndDisplayed(loginPage.passwordBox);
  await loginPage.inputPasswordAndLogin();
  await driverWrapper.waitUntilElementLoadedAndDisplayed(loginPage.loginResults);
});

Then(/^I should be logged in successffully$/, async () => {
  const elem = await driverWrapper.findElement(loginPage.loginResults);
  assert.isTrue(await elem.isDisplayed());
});
