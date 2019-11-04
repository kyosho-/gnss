import { Time } from '../model/time';

export class CacheableTime {
    private raw: string;
    private cache: Time;

    constructor(raw: string) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): Time {
        if (undefined === this.cache) {
            this.cache = Time.parse(this.raw);
        }

        if (undefined === this.cache) {
            throw new Error(`Value is not valid. (value=${this.raw})`);
        }

        return this.cache;
    }
}
