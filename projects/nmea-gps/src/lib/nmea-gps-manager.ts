import {
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
import { NmeaGpsFactory } from './nmea-gps-factory';

export class NmeaGpsManager {

    private messageDtm: MessageDtm;
    private messageGbq: MessageGbq;
    private messageGbs: MessageGbs;
    private messageGga: MessageGga;
    private messageGll: MessageGll;
    private messageGlq: MessageGlq;
    private messageGnq: MessageGnq;
    private messageGns: MessageGns;
    private messageGpq: MessageGpq;
    private messageGrs: MessageGrs;
    private messageGsa: MessageGsa;
    private messageGst: MessageGst;
    private messageGsv: MessageGsv;
    private messageRmc: MessageRmc;
    private messageTxt: MessageTxt;
    private messageVlw: MessageVlw;
    private messageVtg: MessageVtg;
    private messageZda: MessageZda;

    get dtm() { return this.messageDtm; }
    get gbq() { return this.messageGbq; }
    get gbs() { return this.messageGbs; }
    get gga() { return this.messageGga; }
    get gll() { return this.messageGll; }
    get glq() { return this.messageGlq; }
    get gnq() { return this.messageGnq; }
    get gns() { return this.messageGns; }
    get gpq() { return this.messageGpq; }
    get grs() { return this.messageGrs; }
    get gsa() { return this.messageGsa; }
    get gst() { return this.messageGst; }
    get gsv() { return this.messageGsv; }
    get rmc() { return this.messageRmc; }
    get txt() { return this.messageTxt; }
    get vlw() { return this.messageVlw; }
    get vtg() { return this.messageVtg; }
    get zda() { return this.messageZda; }

    update(line: string): void {
        const message = NmeaGpsFactory.create(line);

        switch (message.messageId) {
            case MessageId.DTM:
                this.messageDtm = message as MessageDtm;
                break;
            case MessageId.GBQ:
                this.messageGbq = message as MessageGbq;
                break;
            case MessageId.GBS:
                this.messageGbs = message as MessageGbs;
                break;
            case MessageId.GGA:
                this.messageGga = message as MessageGga;
                break;
            case MessageId.GLL:
                this.messageGll = message as MessageGll;
                break;
            case MessageId.GLQ:
                this.messageGlq = message as MessageGlq;
                break;
            case MessageId.GNQ:
                this.messageGnq = message as MessageGnq;
                break;
            case MessageId.GNS:
                this.messageGns = message as MessageGns;
                break;
            case MessageId.GPQ:
                this.messageGpq = message as MessageGpq;
                break;
            case MessageId.GRS:
                this.messageGrs = message as MessageGrs;
                break;
            case MessageId.GSA:
                this.messageGsa = message as MessageGsa;
                break;
            case MessageId.GST:
                this.messageGst = message as MessageGst;
                break;
            case MessageId.GSV:
                this.messageGsv = message as MessageGsv;
                break;
            case MessageId.RMC:
                this.messageRmc = message as MessageRmc;
                break;
            case MessageId.TXT:
                this.messageTxt = message as MessageTxt;
                break;
            case MessageId.VLW:
                this.messageVlw = message as MessageVlw;
                break;
            case MessageId.VTG:
                this.messageVtg = message as MessageVtg;
                break;
            case MessageId.ZDA:
                this.messageZda = message as MessageZda;
                break;
            default:
                throw new Error(`Unsupported message ID. (id=${message.messageId})`);
        }
    }
}
