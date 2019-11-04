import { Time } from './time';

describe('Time', () => {
  it('should create an instance', () => {
    let time = Time.parse('000000.00');
    expect(time.hour).toEqual(0);
    expect(time.minute).toEqual(0);
    expect(time.second).toEqual(0);
    expect(time.millisecond).toEqual(0);

    time = Time.parse('235959.99');
    expect(time.hour).toEqual(23);
    expect(time.minute).toEqual(59);
    expect(time.second).toEqual(59);
    expect(time.millisecond).toEqual(99);
  });
});
