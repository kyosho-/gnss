import { CacheableTime } from './cacheable-time';

describe('CacheableTime', () => {
  it('should create an instance', () => {
    let time = new CacheableTime('000000.00').value;
    expect(time.hour).toEqual(0);
    expect(time.minute).toEqual(0);
    expect(time.second).toEqual(0);
    expect(time.millisecond).toEqual(0);

    time = new CacheableTime('235959.99').value;
    expect(time.hour).toEqual(23);
    expect(time.minute).toEqual(59);
    expect(time.second).toEqual(59);
    expect(time.millisecond).toEqual(99);
  });
});
