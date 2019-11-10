import { NmeaGsvManager } from './nmea-gsv-manager';
import { MessageGsv } from '../messages';
import { NmeaGps } from '../nmea-gps';

describe('NmeaGsvManager', () => {
  xit('should success single line', () => {
    const lines = ['$GAGSV,1,1,00,2*76'];
    const nmeas = [new MessageGsv(new NmeaGps(lines[0]))];
    const actual = new NmeaGsvManager();
    expect(actual.update(nmeas[0])).not.toBeUndefined();
  });

  it('should success multi line', () => {
    const lines = [
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64',
      '$GPGSV,3,3,09,25,,,40,1*6E',
      '$GAGSV,1,1,00,2*76',
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64',
      '$GPGSV,3,3,09,25,,,40,1*6E'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1])),
      new MessageGsv(new NmeaGps(lines[2])),
      new MessageGsv(new NmeaGps(lines[3])),
      new MessageGsv(new NmeaGps(lines[4])),
      new MessageGsv(new NmeaGps(lines[5])),
      new MessageGsv(new NmeaGps(lines[6]))
    ];
    const actual = new NmeaGsvManager();
    // normal
    expect(actual.update(nmeas[0])).toBeUndefined();
    expect(actual.gsv).toBeUndefined();
    expect(actual.update(nmeas[1])).toBeUndefined();
    expect(actual.gsv).toBeUndefined();
    expect(actual.update(nmeas[2])).not.toBeUndefined();
    expect(actual.gsv).not.toBeUndefined();
    // reset
    expect(actual.update(nmeas[3])).not.toBeUndefined();
    expect(actual.gsv).not.toBeUndefined();
    // reset
    expect(actual.update(nmeas[4])).toBeUndefined();
    expect(actual.gsv).not.toBeUndefined();
    expect(actual.update(nmeas[5])).toBeUndefined();
    expect(actual.gsv).not.toBeUndefined();
    expect(actual.update(nmeas[6])).not.toBeUndefined();
    expect(actual.gsv).not.toBeUndefined();
  });
});
