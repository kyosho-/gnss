import { Dm } from './dm';

describe('Dm', () => {
  it('should create an instance', () => {
    // expect(new Dm()).toBeTruthy();
    let dir = 'N';
    let dms = '4717.112671';
    let actual = Dm.parse(dir, dms).value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(47.28521118).toEqual(actual);

    dir = 'S';
    dms = '4717.112671';
    actual = Dm.parse(dir, dms).value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-47.28521118).toEqual(actual);

    dir = 'E';
    dms = '00833.914843';
    actual = Dm.parse(dir, dms).value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(8.56524738).toEqual(actual);

    dir = 'W';
    dms = '00833.914843';
    actual = Dm.parse(dir, dms).value;
    actual = Math.round(actual * 100000000) / 100000000;
    expect(-8.56524738).toEqual(actual);
  });
});
