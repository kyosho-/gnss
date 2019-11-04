import { CacheableEw } from './cacheable-ew';
import { Ew } from '../model/ew.enum';

describe('CacheableEw', () => {
  it('should create an instance', () => {
    expect(new CacheableEw('E').value).toEqual(Ew.E);
    expect(new CacheableEw('W').value).toEqual(Ew.W);
    try {
      const value = new CacheableEw('N').value;
      fail();
    } catch (error) {
    }
  });
});
