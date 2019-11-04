import { CacheableDm } from './cacheable-dm';

describe('CacheableDm', () => {
  it('should create an instance', () => {
    let dir = 'N';
    let dms = '4717.112671';
    let actual = new CacheableDm(dir, dms).value.value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(47.28521118).toEqual(actual);

    dir = 'S';
    dms = '4717.112671';
    actual = new CacheableDm(dir, dms).value.value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-47.28521118).toEqual(actual);

    dir = 'E';
    dms = '00833.914843';
    actual = new CacheableDm(dir, dms).value.value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(8.56524738).toEqual(actual);

    dir = 'W';
    dms = '00833.914843';
    actual = new CacheableDm(dir, dms).value.value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-8.56524738).toEqual(actual);
  });
});
