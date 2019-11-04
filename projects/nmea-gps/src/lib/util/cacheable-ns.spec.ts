import { CacheableNs } from './cacheable-ns';
import { Ns } from '../model/ns.enum';

describe('CacheableNs', () => {
  it('should create an instance', () => {
    expect(new CacheableNs('N').value).toEqual(Ns.N);
    expect(new CacheableNs('S').value).toEqual(Ns.S);
    try {
      const value = new CacheableNs('E').value;
      fail();
    } catch (error) {
    }
  });
});
