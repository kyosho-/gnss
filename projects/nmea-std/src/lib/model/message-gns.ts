import { Message } from './message';

export interface MessageGns extends Message {
    time: string;
    lat: string;
    NS: string;
    lon: string;
    EW: string;
    posMode: string;
    numSV: number;
    HDOP: number;
    alt: number;
    sep: number;
    diffAge: number;
    diffStation: number;
    navStatus: string;
}
