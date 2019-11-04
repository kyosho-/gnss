import { CacheableDatum } from './cacheable-datum';
import { Datum } from '../model';

describe('CacheableDatum', () => {
  it('should create an instance', () => {
    expect(new CacheableDatum('W84').value).toEqual(Datum.WGS84);
    expect(new CacheableDatum('P90').value).toEqual(Datum.PZ90);
    expect(new CacheableDatum('999').value).toEqual(Datum.UserDefined);
    try {
      const value = new CacheableDatum('xxx').value;
      fail();
    } catch (error) {
    }
  });
});
