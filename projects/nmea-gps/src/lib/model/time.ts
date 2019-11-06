import { match } from 'minimatch';

export class Time {
    static readonly TIME_REGEX: RegExp =
        /^([0-9]{2})([0-9]{2})([0-9]{2})\.([0-9]{2})$/;

    private hh: number;
    private mm: number;
    private sec: number;
    private ms: number;

    static parse(sentence: string): Time {
        if (undefined === sentence) {
            throw new Error(`Sentence is undefinced. (sentence=${sentence})`);
        }

        const matched: string[] = sentence.match(Time.TIME_REGEX);

        if (null === matched || undefined === matched || 5 !== matched.length) {
            throw new Error(`Parse Error. (sentence=${sentence})`);
        }

        const hh = Number.parseInt(matched[1], 10);
        const mm = Number.parseInt(matched[2], 10);
        const sec = Number.parseInt(matched[3], 10);
        const ms = Number.parseInt(matched[4], 10);
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
