import { Message } from './message';

export interface MessageGll extends Message {
    lat: string;
    NS: string;
    lon: string;
    EW: string;
    time: string;
    status: string;
    posMode: string;
}
