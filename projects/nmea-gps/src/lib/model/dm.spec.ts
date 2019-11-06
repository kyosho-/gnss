import { Dm } from './dm';

describe('Dm', () => {
  it('should create an instance', () => {
    let dir = 'N';
    let dms = '4717.112671';
    let actual = Dm.parse(dir, dms);
    let round = Math.round(actual.value * 100000000) / 100000000;
    expect(47.28521118).toEqual(round);
    expect(47).toEqual(actual.degrees);
    expect(17.112671).toEqual(actual.minutes);

    dir = 'S';
    dms = '4717.112671';
    actual = Dm.parse(dir, dms);
    round = Math.round(actual.value * 100000000) / 100000000;
    expect(-47.28521118).toEqual(round);

    dir = 'E';
    dms = '00833.914843';
    actual = Dm.parse(dir, dms);
    round = Math.round(actual.value * 100000000) / 100000000;
    expect(8.56524738).toEqual(round);

    dir = 'W';
    dms = '00833.914843';
    actual = Dm.parse(dir, dms);
    round = Math.round(actual.value * 100000000) / 100000000;
    expect(-8.56524738).toEqual(round);
  });

  it('should get error on creation.', () => {
    try {
      const dir = undefined;
      const dms = '4717.112671';
      const actual = Dm.parse(dir, dms).value;
    } catch (error) {
      expect(error.message).toEqual('Direction is not valid. (direction=undefined)');
    }

    try {
      const dir = 'A';
      const dms = '4717.112671';
      const actual = Dm.parse(dir, dms).value;
    } catch (error) {
      expect(error.message).toEqual('Direction is not valid. (direction=A)');
    }

    try {
      const dir = 'N';
      const dms = undefined;
      const actual = Dm.parse(dir, dms).value;
    } catch (error) {
      expect(error.message).toEqual('dms is undefined.');
    }

    try {
      const dir = 'N';
      const dms = '';
      const actual = Dm.parse(dir, dms).value;
    } catch (error) {
      expect(error.message).toEqual('Parse Error. (value=)');
    }
  });
});
