export class Dm {
    static readonly DM_REGEX: RegExp =
        /^([0-9]{2,3})([0-9]{2}\.[0-9]+)$/;

    private sign: number;
    private d: number;
    private m: number;

    static parseSign(direction: string): number {
        if (undefined === direction || 1 !== direction.length) {
            throw new Error(`Direction is not valid. (direction=${direction})`);
        }

        switch (direction) {
            case 'N':
            case 'E':
                return 1;
            case 'S':
            case 'W':
                return -1;
            default:
                throw new Error(`Direction is not valid. (direction=${direction})`);
        }
    }

    static parse(direction: string, sentence: string): Dm {
        const sign = Dm.parseSign(direction);

        if (undefined === sentence) {
            throw new Error(`dms is undefined.`);
        }

        const matched: string[] = sentence.match(Dm.DM_REGEX);
        if (undefined === matched || null === matched || 3 !== matched.length) {
            throw new Error(`Parse Error. (value=${sentence})`);
        }
        const d = Number.parseInt(matched[1], 10);
        const m = Number.parseFloat(matched[2]);

        return new Dm(sign, d, m);
    }

    constructor(
        sign: number,
        d: number,
        m: number) {

        this.sign = sign;
        this.d = d;
        this.m = m;
    }

    get degrees(): number { return this.d; }
    get minutes(): number { return this.m; }
    get value(): number {
        return this.sign * (this.d + (this.m / 60));
    }
}
