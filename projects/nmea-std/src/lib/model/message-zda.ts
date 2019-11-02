import { Message } from './message';

export interface MessageZda extends Message {
    time: string;
    day: number;
    month: number;
    year: number;
    ltzh: number;
    ltzn: number;
}
