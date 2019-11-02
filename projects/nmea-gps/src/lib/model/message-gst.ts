import { Message } from './message';

export interface MessageGst extends Message {
    time: string;
    rangeRms: number;
    stdMajor: number;
    stdMinor: number;
    orient: number;
    stdLat: number;
    stdLong: number;
    stdAlt: number;
}
