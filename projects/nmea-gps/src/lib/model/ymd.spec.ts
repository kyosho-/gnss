import { Ymd } from './ymd';

describe('Ymd', () => {
  it('should create an instance', () => {
    const target = Ymd.parse('070103');
    expect(target).toBeTruthy();
    expect(target.year).toEqual(3);
    expect(target.month).toEqual(1);
    expect(target.day).toEqual(7);
  });

  it('should error an instance', () => {
    try {
      const target = Ymd.parse(undefined);
      fail();
    } catch (error) {
      expect(error.message).toEqual('Sentence is undefinced. (sentence=undefined)');
    }
  });

  it('should be null.', () => {
    try {
      const target = Ymd.parse('');
      fail();
    } catch (error) {
      expect(error.message).toEqual('Parse Error. (sentence=)');
    }
  });

  it('should be parse error.', () => {
    try {
      const target = Ymd.parse('abcdefg');
      fail();
    } catch (error) {
      expect(error.message).toEqual('Parse Error. (sentence=abcdefg)');
    }
  });
});
