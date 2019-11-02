import { Nmea } from '@kyosho-/nmea';

import { Message, MessageId } from './model';

import { NmeaStd } from './std/nmea-std';
import { NmeaStdDtm } from './std/nmea-std-dtm';
import { NmeaStdGbq } from './std/nmea-std-gbq';
import { NmeaStdGbs } from './std/nmea-std-gbs';
import { NmeaStdGga } from './std/nmea-std-gga';
import { NmeaStdGll } from './std/nmea-std-gll';
import { NmeaStdGlq } from './std/nmea-std-glq';
import { NmeaStdGnq } from './std/nmea-std-gnq';
import { NmeaStdGns } from './std/nmea-std-gns';
import { NmeaStdGpq } from './std/nmea-std-gpq';
import { NmeaStdGrs } from './std/nmea-std-grs';
import { NmeaStdGsa } from './std/nmea-std-gsa';
import { NmeaStdGst } from './std/nmea-std-gst';
import { NmeaStdGsv } from './std/nmea-std-gsv';
import { NmeaStdRmc } from './std/nmea-std-rmc';
import { NmeaStdTxt } from './std/nmea-std-txt';
import { NmeaStdVlw } from './std/nmea-std-vlw';
import { NmeaStdVtg } from './std/nmea-std-vtg';
import { NmeaStdZda } from './std/nmea-std-zda';

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
