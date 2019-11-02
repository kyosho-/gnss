import { Message } from './message';

export interface MessageGpq extends Message {
    msgId: string;
}
