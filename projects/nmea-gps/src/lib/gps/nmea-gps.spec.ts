import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsDtm } from './nmea-gps-dtm';
import { MessageSummary } from '../model/message-summary';

describe('NmeaGps', () => {
  it('should error on validate.', () => {
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsDtm(nmea);

    try {
      snmea.validate(
        nmea,
        {
          isStandard: true,
          talkerId: undefined,
          messageId: undefined
        } as MessageSummary
      );
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }

    try {
      snmea.validate(
        nmea,
        {
          isStandard: true,
          talkerId: snmea.getTalkerId(),
          messageId: undefined
        } as MessageSummary
      );
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
