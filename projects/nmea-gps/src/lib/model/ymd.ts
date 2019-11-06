export class Ymd {
    /**
     * ddmmyy
     */
    static readonly YMD_REGEX: RegExp =
        /^([0-9]{2})([0-9]{2})([0-9]{2})$/;

    private yy: number;
    private mm: number;
    private dd: number;

    static parse(sentence: string): Ymd {
        if (undefined === sentence) {
            throw new Error(`Sentence is undefinced. (sentence=${sentence})`);
        }

        const matched: string[] = sentence.match(Ymd.YMD_REGEX);

        if (null === matched || undefined === matched || 4 !== matched.length) {
            throw new Error(`Parse Error. (sentence=${sentence})`);
        }

        const dd = Number.parseInt(matched[1], 10);
        const mm = Number.parseInt(matched[2], 10);
        const yy = Number.parseInt(matched[3], 10);
        return new Ymd(yy, mm, dd);
    }

    constructor(
        yy: number,
        mm: number,
        dd: number) {

        this.yy = yy;
        this.mm = mm;
        this.dd = dd;
    }

    get year(): number { return this.yy; }
    get month(): number { return this.mm; }
    get day(): number { return this.dd; }
}
