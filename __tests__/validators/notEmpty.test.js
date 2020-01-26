import { notEmpty } from '../../src/validators';

describe('Test string validation', () => {
  it('Should invalidate empty string', () => {
    expect(notEmpty('')).toEqual(false);
  });

  it('Should invalidate undefined', () => {
    expect(notEmpty()).toEqual(false);
  });

  it('Should invalidate null', () => {
    expect(notEmpty(null)).toEqual(false);
  });

  it('Should invalidate object', () => {
    expect(notEmpty({})).toEqual(false);
  });

  it('Should validate string', () => {
    expect(notEmpty('gustavo')).toEqual(true);
  });
});
