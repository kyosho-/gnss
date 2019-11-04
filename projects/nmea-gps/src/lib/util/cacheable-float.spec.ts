import { CacheableFloat } from './cacheable-float';

describe('CacheableFloat', () => {
  it('should create an instance', () => {
    expect(new CacheableFloat('1').value).toEqual(1);
    expect(new CacheableFloat('-1').value).toEqual(-1);
    try {
      const value = new CacheableFloat('N').value;
      fail();
    } catch (error) {
    }
  });
});
