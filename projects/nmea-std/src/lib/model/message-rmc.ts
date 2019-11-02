import { Message } from './message';

export interface MessageRmc extends Message {
    time: string;
    status: string;
    lat: string;
    NS: string;
    lon: string;
    EW: string;
    spd: number;
    cog: number;
    date: string;
    mv: number;
    mvEW: string;
    posMode: string;
    navStatus: string;
}
