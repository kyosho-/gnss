import { Nmea } from '@kyosho-/nmea';

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
        const nmea: Nmea = Nmea.parse(line);

        const summary = NmeaGps.summary(nmea);
        if (!summary.isStandard) {
            throw new Error(`This data is not  NMEA format. (line=${line})`);
        }

        const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
        let message: Message;
        switch (summary.messageId) {
            case MessageId.DTM:
                message = new MessageDtm(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GBQ:
                message = new MessageGbq(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GBS:
                message = new MessageGbs(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GGA:
                message = new MessageGga(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GLL:
                message = new MessageGll(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GLQ:
                message = new MessageGlq(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GNQ:
                message = new MessageGnq(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GNS:
                message = new MessageGns(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GPQ:
                message = new MessageGpq(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GRS:
                message = new MessageGrs(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GSA:
                message = new MessageGsa(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GST:
                message = new MessageGst(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.GSV:
                message = new MessageGsv(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.RMC:
                message = new MessageRmc(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.TXT:
                message = new MessageTxt(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.VLW:
                message = new MessageVlw(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.VTG:
                message = new MessageVtg(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            case MessageId.ZDA:
                message = new MessageZda(
                    summary.talkerId,
                    summary.messageId,
                    splitted);
                break;
            default:
                throw new Error(
                    `Unsupported message ID. (id=${summary.messageId})`);
        }

        return message;
    }
}
