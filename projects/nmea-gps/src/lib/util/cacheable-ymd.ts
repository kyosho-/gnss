import { Ymd } from '../model/ymd';

export class CacheableYmd {
    private raw: string;
    private cache: Ymd;

    constructor(raw: string) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): Ymd {
        if (undefined === this.cache) {
            this.cache = Ymd.parse(this.raw);
        }

        if (undefined === this.cache) {
            throw new Error(`Value is not valid. (value=${this.raw})`);
        }

        return this.cache;
    }
}
