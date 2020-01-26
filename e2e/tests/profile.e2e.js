/* eslint-disable import/no-extraneous-dependencies */
const {
  by,
  // device,
  element,
  // waitFor,
} = require('detox');

describe('Profile screen', () => {
  it('should navigate to profile screen', async () => {
    const profileTabIcon = element(by.id('profileTabIcon'));
    await expect(profileTabIcon).toBeVisible();
    await profileTabIcon.tap();
    await expect(element(by.id('profileHeader'))).toBeVisible();
  });

  it('should press edit button and see the text input', async () => {
    const nameInput = element(by.id('profileNameInput'));
    const emailInput = element(by.id('profileEmailInput'));
    const jobInput = element(by.id('profileJobInput'));
    const countryInput = element(by.id('profileCountryInput'));
    await element(by.id('profileEditButton')).tap();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(jobInput).toBeVisible();
    await expect(countryInput).toBeVisible();
  });

  it('should edit users profile', async () => {
    const nameInput = element(by.id('profileNameInput'));
    const jobInput = element(by.id('profileJobInput'));
    const countryInput = element(by.id('profileCountryInput'));
    await nameInput.typeText('Eve Holt\n');
    await jobInput.typeText('Software Developer\n');
    await countryInput.typeText('Spain\n');
    await element(by.id('profileUpdateButton')).tap();
    await expect(element(by.id('profileEditButton')));
  });
});
