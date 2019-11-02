import { Message } from './message';

export interface MessageGbs extends Message {
    time: string;
    errLat: number;
    errLon: number;
    errAlt: number;
    svid: number;
    prob: number;
    bias: number;
    stddev: number;
    systemId: number;
    signalId: number;
}
