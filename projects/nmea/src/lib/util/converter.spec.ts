import { Converter } from './converter';

describe('Converter', () => {
  it('should success DM parsing.', () => {
    let dir = 'N';
    let dms = '4717.112671';
    let actual = Converter.parseDms(dir, dms);
    actual = Math.round(actual * 100000000) / 100000000;
    expect(47.28521118).toEqual(actual);

    dir = 'S';
    dms = '4717.112671';
    actual = Converter.parseDms(dir, dms);
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-47.28521118).toEqual(actual);

    dir = 'E';
    dms = '00833.914843';
    actual = Converter.parseDms(dir, dms);
    actual = Math.round(actual * 100000000) / 100000000;
    expect(8.56524738).toEqual(actual);

    dir = 'W';
    dms = '00833.914843';
    actual = Converter.parseDms(dir, dms);
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-8.56524738).toEqual(actual);
  });

  it('should success Time parsing.', () => {
    const today = new Date();
    let hhmmssSS = '000000.00';
    let actual = Converter.setTime(today, hhmmssSS);
    expect(actual.getUTCHours()).toEqual(0);
    expect(actual.getUTCMinutes()).toEqual(0);
    expect(actual.getUTCSeconds()).toEqual(0);
    expect(actual.getUTCMilliseconds()).toEqual(0);

    hhmmssSS = '235959.99';
    actual = Converter.setTime(today, hhmmssSS);
    expect(actual.getUTCHours()).toEqual(23);
    expect(actual.getUTCMinutes()).toEqual(59);
    expect(actual.getUTCSeconds()).toEqual(59);
    expect(actual.getUTCMilliseconds()).toEqual(99);

    hhmmssSS = '090706.05';
    actual = Converter.setTime(today, hhmmssSS);
    expect(actual.getUTCHours()).toEqual(9);
    expect(actual.getUTCMinutes()).toEqual(7);
    expect(actual.getUTCSeconds()).toEqual(6);
    expect(actual.getUTCMilliseconds()).toEqual(5);
  });
});
