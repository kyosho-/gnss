import { Message } from './message';

export interface MessageVlw extends Message {
    twd: number;
    twdUnit: string;
    wd: number;
    wdUnit: string;
    tgd: number;
    tgdUnit: string;
    gd: number;
    gdUnit: string;
}
