import { Message } from './message';
import { MessageGsvSatellite } from './message-gsv-satellite';

export interface MessageGsv extends Message {
    numMsg: number;
    msgNum: number;
    numSV: number;
    sv: MessageGsvSatellite[];
    /**
     * NMEA defined GNSS Signal ID, see SignalIdentifiers table (only available in NMEA 4.10and later)
     * option?
     */
    signalId: number;
}
