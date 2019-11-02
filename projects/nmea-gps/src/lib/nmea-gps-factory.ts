import { Nmea } from '@kyosho-/nmea';

import { Message, MessageId } from './model';

import { NmeaGps } from './parser/nmea-gps';
import { NmeaGpsDtm } from './parser/nmea-gps-dtm';
import { NmeaGpsGbq } from './parser/nmea-gps-gbq';
import { NmeaGpsGbs } from './parser/nmea-gps-gbs';
import { NmeaGpsGga } from './parser/nmea-gps-gga';
import { NmeaGpsGll } from './parser/nmea-gps-gll';
import { NmeaGpsGlq } from './parser/nmea-gps-glq';
import { NmeaGpsGnq } from './parser/nmea-gps-gnq';
import { NmeaGpsGns } from './parser/nmea-gps-gns';
import { NmeaGpsGpq } from './parser/nmea-gps-gpq';
import { NmeaGpsGrs } from './parser/nmea-gps-grs';
import { NmeaGpsGsa } from './parser/nmea-gps-gsa';
import { NmeaGpsGst } from './parser/nmea-gps-gst';
import { NmeaGpsGsv } from './parser/nmea-gps-gsv';
import { NmeaGpsRmc } from './parser/nmea-gps-rmc';
import { NmeaGpsTxt } from './parser/nmea-gps-txt';
import { NmeaGpsVlw } from './parser/nmea-gps-vlw';
import { NmeaGpsVtg } from './parser/nmea-gps-vtg';
import { NmeaGpsZda } from './parser/nmea-gps-zda';

export class NmeaGpsFactory {

    constructor() {
        throw new Error(`Constructor is not supported.`);
    }

    static create(line: string): Message {
        const nmea: Nmea = Nmea.parse(line);
        const validationResult = NmeaGps.isStandard(nmea);

        if (!validationResult.isStandard) {
            throw new Error(`This data is not  NMEA format. (line=${line})`);
        }

        let nmeaGps: NmeaGps;
        switch (validationResult.messageId) {
            case MessageId.DTM:
                nmeaGps = new NmeaGpsDtm(nmea);
                break;
            case MessageId.GBQ:
                nmeaGps = new NmeaGpsGbq(nmea);
                break;
            case MessageId.GBS:
                nmeaGps = new NmeaGpsGbs(nmea);
                break;
            case MessageId.GGA:
                nmeaGps = new NmeaGpsGga(nmea);
                break;
            case MessageId.GLL:
                nmeaGps = new NmeaGpsGll(nmea);
                break;
            case MessageId.GLQ:
                nmeaGps = new NmeaGpsGlq(nmea);
                break;
            case MessageId.GNQ:
                nmeaGps = new NmeaGpsGnq(nmea);
                break;
            case MessageId.GNS:
                nmeaGps = new NmeaGpsGns(nmea);
                break;
            case MessageId.GPQ:
                nmeaGps = new NmeaGpsGpq(nmea);
                break;
            case MessageId.GRS:
                nmeaGps = new NmeaGpsGrs(nmea);
                break;
            case MessageId.GSA:
                nmeaGps = new NmeaGpsGsa(nmea);
                break;
            case MessageId.GST:
                nmeaGps = new NmeaGpsGst(nmea);
                break;
            case MessageId.GSV:
                nmeaGps = new NmeaGpsGsv(nmea);
                break;
            case MessageId.RMC:
                nmeaGps = new NmeaGpsRmc(nmea);
                break;
            case MessageId.TXT:
                nmeaGps = new NmeaGpsTxt(nmea);
                break;
            case MessageId.VLW:
                nmeaGps = new NmeaGpsVlw(nmea);
                break;
            case MessageId.VTG:
                nmeaGps = new NmeaGpsVtg(nmea);
                break;
            case MessageId.ZDA:
                nmeaGps = new NmeaGpsZda(nmea);
                break;
            default:
                // TIPS: Unit Testでは到達できない
                throw new Error(`Unsupported message ID. (id=${validationResult.messageId})`);
        }

        return nmeaGps.getMessage();
    }
}
