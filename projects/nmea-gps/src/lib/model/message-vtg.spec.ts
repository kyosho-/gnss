import { Nmea } from '@kyosho-/nmea';
import { MessageVtg } from './message-vtg';
import { NmeaGps } from '../nmea-gps';

describe('MessageVtg', () => {
  it('should create an instance', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageVtg(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
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
