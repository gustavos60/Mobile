import { validEmail } from '../../src/validators';

describe('Test email validation', () => {
  it('Should invalidate empty email', () => {
    expect(validEmail('')).toEqual(false);
  });

  it('Should invalidate email without @', () => {
    expect(validEmail('gustavo.adasd.ccc')).toEqual(false);
  });

  it('Should invalidate undefined', () => {
    expect(validEmail()).toEqual(false);
  });

  it('Should invalidate null', () => {
    expect(validEmail(null)).toEqual(false);
  });

  it('Should invalidate email without . after @', () => {
    expect(validEmail('gustavo@arra')).toEqual(false);
  });

  it('Should validate valid email', () => {
    expect(validEmail('gustavos60@gmail.com')).toEqual(true);
  });
});
