import { mapToEnum } from './map-to-enum';
import { Datum } from '../model/datum.enum';

export class CacheableDatum {
    private raw: string;
    private cache: Datum;
    private type = Datum;

    constructor(raw: string) {
        this.raw = raw;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): Datum {
        if (undefined === this.cache) {
            this.cache = mapToEnum(this.type, this.raw);
        }

        if (undefined !== this.raw && undefined === this.cache) {
            throw new Error(`Unsupported value. (value=${this.raw})`);
        }

        return this.cache;
    }
}
