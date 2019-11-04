import { CacheableInteger } from './cacheable-integer';

describe('CacheableInteger', () => {
  it('should create an instance', () => {
    expect(new CacheableInteger('1').value).toEqual(1);
    expect(new CacheableInteger('-1').value).toEqual(-1);
    try {
      const value = new CacheableInteger('N').value;
      fail();
    } catch (error) {
    }
  });
});
