import { MessageGsv } from '../message';
import { NmeaGps } from '../nmea-gps';
import { Gsv } from './gsv';

describe('Gsv', () => {
  it('should create single line and no sv instance', () => {
    const lines = ['$GAGSV,1,1,00,2*76'];
    const nmeas = [new MessageGsv(new NmeaGps(lines[0]))];
    const actual = new Gsv(nmeas);
    expect(actual).toBeTruthy();
    expect(actual.messages.length).toEqual(1);
    expect(actual.numMsg).toEqual(1);
    expect(actual.numSv).toEqual(0);
    expect(actual.sv.length).toEqual(0);
  });

  it('should create single line instance', () => {
    const lines = ['$GPGSV,1,1,03,12,,,42,24,,,47,32,,,37,5*66'];
    const nmeas = [new MessageGsv(new NmeaGps(lines[0]))];
    const actual = new Gsv(nmeas);
    expect(actual).toBeTruthy();
    expect(actual.messages.length).toEqual(1);
    expect(actual.numMsg).toEqual(1);
    expect(actual.numSv).toEqual(3);
    expect(actual.sv.length).toEqual(3);
  });

  it('should create multi line instance', () => {
    const lines = [
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64',
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,3,09,25,,,40,1*6E'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1])),
      new MessageGsv(new NmeaGps(lines[2]))
    ];
    const actual = new Gsv(nmeas);
    expect(actual).toBeTruthy();
    expect(actual.messages.length).toEqual(3);
    expect(actual.numMsg).toEqual(3);
    expect(actual.numSv).toEqual(9);
    expect(actual.sv.length).toEqual(9);
  });

  it('should create multi line instance', () => {
    const lines = [
      '$GPGSV,3,3,09,25,,,40,1*6E',
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1])),
      new MessageGsv(new NmeaGps(lines[2]))
    ];
    const actual = new Gsv(nmeas);
    expect(actual).toBeTruthy();
    expect(actual.messages.length).toEqual(3);
    expect(actual.numMsg).toEqual(3);
    expect(actual.numSv).toEqual(9);
    expect(actual.sv.length).toEqual(9);
  });

  it('should be error on multi line instance', () => {
    const lines = [
      '$GPGSV,3,3,09,25,,,40,1*6E',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1])),
      new MessageGsv(new NmeaGps(lines[2]))
    ];
    try {
      // tslint:disable-next-line: no-unused-expression
      new Gsv(nmeas);
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should be error on multi line instance', () => {
    const lines = [
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1])),
      new MessageGsv(new NmeaGps(lines[2]))
    ];

    try {
      const result = Gsv.validateMessage(nmeas[1], 2, 2, 9);
      expect(result).toBeFalsy();
    } catch (error) {
      fail(error);
    }

    try {
      const result = Gsv.validateMessage(nmeas[1], 3, 1, 9);
      expect(result).toBeFalsy();
    } catch (error) {
      fail(error);
    }

    try {
      const result = Gsv.validateMessage(nmeas[1], 3, 2, 10);
      expect(result).toBeFalsy();
    } catch (error) {
      fail(error);
    }

    try {
      // tslint:disable-next-line: no-unused-expression
      new Gsv(nmeas);
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
      // fail(error);
    }
  });

  it('should create multi line instance', () => {
    const lines = [
      '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F',
      '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64'
    ];
    const nmeas = [
      new MessageGsv(new NmeaGps(lines[0])),
      new MessageGsv(new NmeaGps(lines[1]))
    ];
    try {
      // tslint:disable-next-line: no-unused-expression
      new Gsv(nmeas);
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
