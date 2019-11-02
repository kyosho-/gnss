import { Message } from './message';
import { MessageGsaSatellite } from './message-gsa-satellite';

export interface MessageGsa extends Message {
    opMode: string;
    navMode: number;
    svid: MessageGsaSatellite[];
    PDOP: number;
    HDOP: number;
    VDOP: number;
    systemId: number;
}
