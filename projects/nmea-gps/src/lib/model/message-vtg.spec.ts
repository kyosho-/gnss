import { Nmea } from '@kyosho-/nmea';
import { MessageVtg } from './message-vtg';
import { NmeaGps } from '../nmea-gps';

describe('MessageVtg', () => {
  it('should create an instance', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageVtg(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.cogt).toEqual(77.52);
    expect(m.cogt).toEqual(77.52);
    expect(m.cogtUnit).toEqual('T');
    expect(m.cogtUnit).toEqual('T');
    expect(m.cogm).toEqual(NaN);
    expect(m.cogm).toEqual(NaN);
    expect(m.cogmUnit).toEqual('M');
    expect(m.cogmUnit).toEqual('M');
    expect(m.sogn).toEqual(0.004);
    expect(m.sogn).toEqual(0.004);
    expect(m.sognUnit).toEqual('N');
    expect(m.sognUnit).toEqual('N');
    expect(m.sogk).toEqual(0.008);
    expect(m.sogk).toEqual(0.008);
    expect(m.sogkUnit).toEqual('K');
    expect(m.sogkUnit).toEqual('K');
    expect(m.posMode).toEqual('A');
    expect(m.posMode).toEqual('A');
  });

  it('should error on parse method.', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageVtg(summary.talkerId, summary.messageId, ['', '']); fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
