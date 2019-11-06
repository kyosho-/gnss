import { NmeaGps } from './nmea-gps';
import {
    Message,
    MessageId,
    MessageDtm,
    MessageGbq,
    MessageGbs,
    MessageGga,
    MessageGll,
    MessageGlq,
    MessageGnq,
    MessageGns,
    MessageGpq,
    MessageGrs,
    MessageGsa,
    MessageGst,
    MessageGsv,
    MessageRmc,
    MessageTxt,
    MessageVlw,
    MessageVtg,
    MessageZda
} from './model';

export class NmeaGpsFactory {

    constructor() {
        throw new Error(`Constructor is not supported.`);
    }

    static create(line: string): Message {
        const nmea: NmeaGps = new NmeaGps(line);
        let message: Message;

        switch (nmea.messageId) {
            case MessageId.DTM:
                message = new MessageDtm(nmea);
                break;
            case MessageId.GBQ:
                message = new MessageGbq(nmea);
                break;
            case MessageId.GBS:
                message = new MessageGbs(nmea);
                break;
            case MessageId.GGA:
                message = new MessageGga(nmea);
                break;
            case MessageId.GLL:
                message = new MessageGll(nmea);
                break;
            case MessageId.GLQ:
                message = new MessageGlq(nmea);
                break;
            case MessageId.GNQ:
                message = new MessageGnq(nmea);
                break;
            case MessageId.GNS:
                message = new MessageGns(nmea);
                break;
            case MessageId.GPQ:
                message = new MessageGpq(nmea);
                break;
            case MessageId.GRS:
                message = new MessageGrs(nmea);
                break;
            case MessageId.GSA:
                message = new MessageGsa(nmea);
                break;
            case MessageId.GST:
                message = new MessageGst(nmea);
                break;
            case MessageId.GSV:
                message = new MessageGsv(nmea);
                break;
            case MessageId.RMC:
                message = new MessageRmc(nmea);
                break;
            case MessageId.TXT:
                message = new MessageTxt(nmea);
                break;
            case MessageId.VLW:
                message = new MessageVlw(nmea);
                break;
            case MessageId.VTG:
                message = new MessageVtg(nmea);
                break;
            case MessageId.ZDA:
                message = new MessageZda(nmea);
                break;
            default:
                throw new Error(
                    `Unsupported message ID. (id=${nmea.messageId})`);
        }

        return message;
    }
}
