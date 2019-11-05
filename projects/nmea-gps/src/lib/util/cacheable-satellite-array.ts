import { Satellite } from '../model/satellite';

export class CacheableSatelliteArray {
    private raw: string[][];
    private cache: Satellite[];

    constructor(raw: string[][]) {
        // validation.
        if (undefined === raw || 0 > raw.length) {
            throw new Error(`parameter is not valid. (raw=${raw})`);
        }

        for (const element of raw) {
            if (undefined === element || 4 !== element.length) {
                throw new Error(`element is invalid length. (element=${element})`);
            }
        }

        //
        this.raw = raw;
    }

    get value(): Satellite[] {
        if (undefined !== this.cache) {
            return this.cache;
        }

        if (undefined === this.raw) {
            return undefined;
        }

        this.cache = [];
        for (const element of this.raw) {
            const svid = Number.parseInt(element[0], 10);
            const elv = Number.parseInt(element[1], 10);
            const az = Number.parseInt(element[2], 10);
            const cno = Number.parseInt(element[3], 10);
            if (Number.isNaN(svid) || Number.isNaN(elv) ||
                Number.isNaN(az) || Number.isNaN(cno)) {
                this.cache = undefined;
                throw new Error(`Value is NaN. (value=${this.raw})`);
            }
            const satellite = new Satellite(svid, elv, az, cno);
            this.cache.push(satellite);
        }

        return this.cache;
    }
}
