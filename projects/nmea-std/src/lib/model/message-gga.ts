import { Message } from './message';

export interface MessageGga extends Message {
    time: string;
    lat: string;
    NS: string;
    lon: string;
    EW: string;
    quality: number;
    numSV: number;
    HDOP: number;
    alt: number;
    altUnit: string;
    sep: number;
    sepUnit: string;
    diffAge: number;
    diffStation: number;
}
