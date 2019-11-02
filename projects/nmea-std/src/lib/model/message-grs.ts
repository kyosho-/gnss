import { Message } from './message';
import { MessageGrsResidual } from './message-grs-residual';

export interface MessageGrs extends Message {
    time: string;
    mode: number;
    residual: MessageGrsResidual[];
    systemId: number;
    signalId: number;
}
