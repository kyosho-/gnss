export class CacheableInteger {
    private raw: string;
    private cache: number;

    constructor(raw: string) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): number {
        if (undefined === this.cache) {
            this.cache = Number.parseInt(this.raw, 10);
        }

        if (Number.isNaN(this.cache)) {
            throw new Error(`Value is NaN. (value=${this.raw})`);
        }

        return this.cache;
    }
}
