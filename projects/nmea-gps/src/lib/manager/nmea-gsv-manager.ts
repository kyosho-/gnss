import { MessageGsv } from '../message';
import { Gsv } from '../type/gsv';

export class NmeaGsvManager {
    private gsvLatest: Gsv;
    private gsvTmp: MessageGsv[] = [];

    constructor() { }

    update(message: MessageGsv): Gsv {
        // clear when msgNum is 1.
        if (1 === message.msgNum) {
            this.gsvTmp.length = 0;
        }

        // update
        this.gsvTmp.push(message);

        // validate
        if (Gsv.validateMessages(this.gsvTmp)) {
            this.gsvLatest = new Gsv(this.gsvTmp);
            return this.gsvLatest;
        }

        return undefined;
    }

    get gsv(): Gsv {
        return this.gsvLatest;
    }
}
