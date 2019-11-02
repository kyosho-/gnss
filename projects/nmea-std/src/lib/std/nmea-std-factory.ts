import { Nmea } from '@kyosho-/nmea';

import { MessageId } from '../model/message-id.enum';
import { Message } from '../model/message';

import { NmeaStd } from './nmea-std';
import { NmeaStdDtm } from './nmea-std-dtm';
import { NmeaStdGbq } from './nmea-std-gbq';
import { NmeaStdGbs } from './nmea-std-gbs';
import { NmeaStdGga } from './nmea-std-gga';
import { NmeaStdGll } from './nmea-std-gll';
import { NmeaStdGlq } from './nmea-std-glq';
import { NmeaStdGnq } from './nmea-std-gnq';
import { NmeaStdGns } from './nmea-std-gns';
import { NmeaStdGpq } from './nmea-std-gpq';
import { NmeaStdGrs } from './nmea-std-grs';
import { NmeaStdGsa } from './nmea-std-gsa';
import { NmeaStdGst } from './nmea-std-gst';
import { NmeaStdGsv } from './nmea-std-gsv';
import { NmeaStdRmc } from './nmea-std-rmc';
import { NmeaStdTxt } from './nmea-std-txt';
import { NmeaStdVlw } from './nmea-std-vlw';
import { NmeaStdVtg } from './nmea-std-vtg';
import { NmeaStdZda } from './nmea-std-zda';

export class NmeaFactory {

    constructor() {
        throw new Error(`Constructor is not supported.`);
    }

    static create(line: string): Message {
        const nmea: Nmea = Nmea.parse(line);
        const validationResult = NmeaStd.isStandard(nmea);

        if (!validationResult.isStandard) {
            throw new Error(`This data is not  NMEA format. (line=${line})`);
        }

        let nmeaStd: NmeaStd;
        switch (validationResult.messageId) {
            case MessageId.DTM:
                nmeaStd = new NmeaStdDtm(nmea);
                break;
            case MessageId.GBQ:
                nmeaStd = new NmeaStdGbq(nmea);
                break;
            case MessageId.GBS:
                nmeaStd = new NmeaStdGbs(nmea);
                break;
            case MessageId.GGA:
                nmeaStd = new NmeaStdGga(nmea);
                break;
            case MessageId.GLL:
                nmeaStd = new NmeaStdGll(nmea);
                break;
            case MessageId.GLQ:
                nmeaStd = new NmeaStdGlq(nmea);
                break;
            case MessageId.GNQ:
                nmeaStd = new NmeaStdGnq(nmea);
                break;
            case MessageId.GNS:
                nmeaStd = new NmeaStdGns(nmea);
                break;
            case MessageId.GPQ:
                nmeaStd = new NmeaStdGpq(nmea);
                break;
            case MessageId.GRS:
                nmeaStd = new NmeaStdGrs(nmea);
                break;
            case MessageId.GSA:
                nmeaStd = new NmeaStdGsa(nmea);
                break;
            case MessageId.GST:
                nmeaStd = new NmeaStdGst(nmea);
                break;
            case MessageId.GSV:
                nmeaStd = new NmeaStdGsv(nmea);
                break;
            case MessageId.RMC:
                nmeaStd = new NmeaStdRmc(nmea);
                break;
            case MessageId.TXT:
                nmeaStd = new NmeaStdTxt(nmea);
                break;
            case MessageId.VLW:
                nmeaStd = new NmeaStdVlw(nmea);
                break;
            case MessageId.VTG:
                nmeaStd = new NmeaStdVtg(nmea);
                break;
            case MessageId.ZDA:
                nmeaStd = new NmeaStdZda(nmea);
                break;
            default:
                // TIPS: Unit Testでは到達できない
                throw new Error(`Unsupported message ID. (id=${validationResult.messageId})`);
        }

        return nmeaStd.getMessage();
    }
}
