import { mapToEnum } from '@kyosho-/nmea';
import { Ew } from '../model/ew.enum';

export class CacheableEw {
    private raw: string;
    private cache: Ew;
    private type = Ew;

    constructor(raw: string) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): Ew {
        if (undefined === this.cache) {
            this.cache = mapToEnum(this.type, this.raw);
        }

        if (undefined === this.cache) {
            throw new Error(`Unsupported value. (value=${this.raw})`);
        }

        return this.cache;
    }
}
