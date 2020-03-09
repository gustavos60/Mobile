/* eslint-disable import/no-extraneous-dependencies */
const {
  by,
  device,
  element,
  waitFor,
} = require('detox');

describe('Auth screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be at login screen', async () => {
    await expect(element(by.text('Reqres.in'))).toBeVisible();
  });

  it('should fail login with unregistered email', async () => {
    const emailInput = element(by.id('emailInput'));
    const passwordInput = element(by.id('passwordInput'));
    const loginButton = element(by.id('loginButton'));
    await emailInput.typeText('gustavo@email.com\n');
    await passwordInput.typeText('1234\n');
    await waitFor(loginButton).toBeVisible().withTimeout(3000);
    await loginButton.tap();
    await expect(element(by.text('user not found'))).toBeVisible();
    await waitFor(element(by.text('OK'))).toBeVisible().withTimeout(3000);
    await element(by.text('OK')).tap();
  });

  it('should fail login with empty email', async () => {
    const emailInput = element(by.id('emailInput'));
    const loginButton = element(by.id('loginButton'));
    const passwordInput = element(by.id('passwordInput'));
    await emailInput.replaceText('');
    await passwordInput.typeText('1234\n');
    await waitFor(loginButton).toBeVisible().withTimeout(3000);
    await loginButton.tap();
    await expect(element(by.text('Atenção'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should fail login with empty password', async () => {
    const emailInput = element(by.id('emailInput'));
    const loginButton = element(by.id('loginButton'));
    const passwordInput = element(by.id('passwordInput'));
    await emailInput.typeText('gustavo@email.com\n');
    await passwordInput.replaceText('');
    await waitFor(loginButton).toBeVisible().withTimeout(3000);
    await loginButton.tap();
    await expect(element(by.text('Atenção'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should login successfully', async () => {
    const emailInput = element(by.id('emailInput'));
    const loginButton = element(by.id('loginButton'));
    const passwordInput = element(by.id('passwordInput'));
    await emailInput.typeText('eve.holt@reqres.in\n');
    await passwordInput.replaceText('123456\n');
    await waitFor(loginButton).toBeVisible().withTimeout(3000);
    await loginButton.tap();
    await expect(element(by.id('listHeader'))).toBeVisible();
  });
});
