import { Nmea } from '@kyosho-/nmea';

import { NmeaGps } from './parser/nmea-gps';
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
        const nmea: Nmea = Nmea.parse(line);

        const validated = NmeaGps.isStandard(nmea);
        if (!validated.isStandard) {
            throw new Error(`This data is not  NMEA format. (line=${line})`);
        }

        const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
        let message: Message;
        switch (validated.messageId) {
            case MessageId.DTM:
                message = new MessageDtm(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GBQ:
                message = new MessageGbq(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GBS:
                message = new MessageGbs(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GGA:
                message = new MessageGga(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GLL:
                message = new MessageGll(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GLQ:
                message = new MessageGlq(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GNQ:
                message = new MessageGnq(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GNS:
                message = new MessageGns(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GPQ:
                message = new MessageGpq(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GRS:
                message = new MessageGrs(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GSA:
                message = new MessageGsa(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GST:
                message = new MessageGst(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.GSV:
                message = new MessageGsv(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.RMC:
                message = new MessageRmc(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.TXT:
                message = new MessageTxt(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.VLW:
                message = new MessageVlw(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.VTG:
                message = new MessageVtg(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            case MessageId.ZDA:
                message = new MessageZda(
                    validated.talkerId,
                    validated.messageId,
                    splitted);
                break;
            default:
                throw new Error(
                    `Unsupported message ID. (id=${validated.messageId})`);
        }

        return message;
    }
}
