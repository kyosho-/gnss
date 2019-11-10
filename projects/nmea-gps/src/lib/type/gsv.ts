import { MessageGsv } from '../messages';
import { Satellite } from './satellite';

export class Gsv {
    private messageGsv: MessageGsv[];
    private numMsgGsv: number;
    private numSvGsv: number;
    private svInternal: Satellite[];

    static validateMessages(messages: MessageGsv[]): boolean {
        // sort
        messages.sort((a: MessageGsv, b: MessageGsv) => {
            return a.msgNum - b.msgNum;
        });

        // first message
        if (1 !== messages[0].msgNum) {
            return false;
        }
        const numMsg = messages[0].numMsg;
        const numSv = messages[0].numSv;

        // validate numMsg
        if (messages.length !== numMsg) {
            return false;
        }

        // validate elements.
        for (let i = 0, index = 1; i < messages.length; i++ , index++) {
            if (!(Gsv.validateMessage(messages[i], numMsg, index, numSv))) {
                return false;
            }
        }

        return true;
    }

    static validateMessage(
        message: MessageGsv,
        numMsg: number,
        msgNum: number,
        numSv: number): boolean {
        // numMsg
        if (message.numMsg !== numMsg) {
            return false;
        }
        // msgNum
        if (message.msgNum !== msgNum) {
            return false;
        }
        // numSv
        if (message.numSv !== numSv) {
            return false;
        }

        return true;
    }

    constructor(messages: MessageGsv[]) {
        // validate & sort
        if (!Gsv.validateMessages(messages)) {
            throw new Error(
                `Messages is invalid. (messages=${JSON.stringify(messages)})`);
        }
        // initialize
        this.messageGsv = messages;
        this.numMsgGsv = messages[0].numMsg;
        this.numSvGsv = messages[0].numSv;
    }

    get messages(): MessageGsv[] {
        return this.messageGsv;
    }

    get numMsg(): number {
        return this.numMsgGsv;
    }

    get numSv(): number {
        return this.numSvGsv;
    }

    get sv(): Satellite[] {
        if (undefined === this.svInternal) {
            this.svInternal = [];
            for (const message of this.messageGsv) {
                this.svInternal = this.sv.concat(message.sv);
            }
        }
        return this.svInternal;
    }
}
