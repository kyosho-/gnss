import { Message } from './message';

export interface MessageTxt extends Message {
    numMsg: number;
    msgNum: number;
    msgType: number;
    text: string;
}
