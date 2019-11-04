import { match } from 'minimatch';

export class Time {
    static readonly TIME_REGEX: RegExp =
        /^([0-9]{2})([0-9]{2})([0-9]{2})\.([0-9]{2})$/;

    private hh: number;
    private mm: number;
    private sec: number;
    private ms: number;

    static parse(sentence: string): Time {
        const matched: string[] = sentence.match(Time.TIME_REGEX);

        if (undefined === matched || 5 !== matched.length) {
            throw new Error(`Parse Error. (value=${sentence})`);
        }

        const hh = Number.parseInt(matched[1], 10);
        const mm = Number.parseInt(matched[2], 10);
        const sec = Number.parseInt(matched[3], 10);
        const ms = Number.parseInt(matched[4], 10);

        if (!Number.isInteger(hh) ||
            !Number.isInteger(mm) ||
            !Number.isInteger(sec) ||
            !Number.isInteger(ms)) {
            throw new Error(`Parse Error. (value=${sentence})`);
        }

        return new Time(hh, mm, sec, ms);
    }

    constructor(
        hh: number,
        mm: number,
        sec: number,
        ms: number) {

        this.hh = hh;
        this.mm = mm;
        this.sec = sec;
        this.ms = ms;
    }

    get hour(): number { return this.hh; }
    get minute(): number { return this.mm; }
    get second(): number { return this.sec; }
    get millisecond(): number { return this.ms; }
}
