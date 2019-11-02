export class Converter {

    public static readonly DELIMITER = '.';

    constructor() {
        throw new Error(`Constructor is not supported.`);
    }

    static setTime(today: Date, hhmmssSS: string): Date {
        today.setUTCHours(Number.parseInt(hhmmssSS.substr(0, 2), 10));
        today.setUTCMinutes(Number.parseInt(hhmmssSS.substr(2, 2), 10));
        today.setUTCSeconds(Number.parseInt(hhmmssSS.substr(4, 2), 10));
        today.setUTCMilliseconds(Number.parseInt(hhmmssSS.substr(7, 2), 10));
        return today;
    }

    static parseSign(direction: string): number {
        if (!direction || 1 !== direction.length) {
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

    /**
     * Parser for lon and lat string.
     * @param direction 'N' or 'S' or 'E' or 'W'.
     * @param dm 'dddmm.mmmmm' or 'ddmm.mmmmm'
     */
    static parseDms(direction: string, dm: string): number {
        // validate
        const sign = this.parseSign(direction);

        if (!dm) {
            throw new Error(`dms is undefined.`);
        }

        const index = dm.indexOf(Converter.DELIMITER);

        if (0 > index) {
            throw new Error(`Unspported DM format. (dm=${dm})`);
        }

        const mSize = dm.length - index + 2;
        const dSize = dm.length - mSize;

        const d = Number.parseInt(dm.substr(0, dSize), 10);
        const m = Number.parseFloat(dm.substr(dSize, mSize));

        return sign * (d + (m / 60));
    }
}
