export class CacheableIntegerArray {
    private raw: string[];
    private cache: number[];

    constructor(raw: string[]) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): number[] {
        if (undefined !== this.cache) {
            return this.cache;
        }

        if (undefined === this.raw) {
            return undefined;
        }

        this.cache = [];
        for (const element of this.raw) {
            const num = Number.parseInt(element, 10);
            if (Number.isNaN(num)) {
                this.cache = undefined;
                throw new Error(`Value is NaN. (value=${this.raw})`);
            }
            this.cache.push(num);
        }

        return this.cache;
    }
}
