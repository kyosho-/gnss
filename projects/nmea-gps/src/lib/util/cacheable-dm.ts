import { Dm } from '../model/dm';

export class CacheableDm {
    private direction: string;
    private sentence: string;
    private cache: Dm;

    constructor(direction: string, sentence: string) {
        this.direction = direction;
        this.sentence = sentence;
    }

    // TODO: 元データ(raw)がundefinedであった場合は、例外ではなくundefinedを返す。
    // TODO: 元データ(raw)が存在しつつ、変換に失敗した場合は、例外を投げる。
    get value(): Dm {
        if (undefined === this.cache) {
            this.cache = Dm.parse(this.direction, this.sentence);
        }

        if (undefined === this.cache) {
            throw new Error(`Value is not valid. (direction=${this.direction}, sentence=${this.sentence})`);
        }

        return this.cache;
    }
}
