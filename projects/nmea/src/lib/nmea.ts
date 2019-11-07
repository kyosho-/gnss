/**
 * NMEA Sentence
 */
// @dynamic
export class Nmea {
    /**
     * NMEA Sentence regex
     */
    static readonly NMEA_REGEX: RegExp =
        /^[!$](([A-Z]+),([^\*]+))\*([0-9a-fA-F]+)(\r\n|\n|\r)?$/;

    /**
     * Input line.
     */
    private line: string;

    /**
     * Address
     */
    private addressInternal: string;

    /**
     * Value
     */
    private valueInternal: string;

    /**
     * Data validator.
     * @param checksumRange target data
     * @param checksum checksum
     */
    static validate(checksumRange: string, checksum: number): boolean {
        let calced = 0;
        // matching checksum
        for (const i of checksumRange) {
            // tslint:disable-next-line: no-bitwise
            calced ^= i.charCodeAt(0);
        }
        return checksum === calced;
    }

    /**
     * Constructor.
     */
    constructor(line: string) {
        this.line = line;
    }

    /**
     * initialize
     */
    private initializeNmea() {
        const matched: string[] = this.line.match(Nmea.NMEA_REGEX);
        const checksumRange = matched[1];
        this.addressInternal = matched[2];
        this.valueInternal = matched[3];

        const checksum = parseInt(matched[4], 16);
        if (!Nmea.validate(checksumRange, checksum)) {
            throw new Error(`Checksum is not match. (line=${this.line})`);
        }
    }

    /**
     * get address.
     */
    get address(): string {
        if (undefined === this.addressInternal) {
            this.initializeNmea();
        }
        return this.addressInternal;
    }

    /**
     * get value.
     */
    get value(): string {
        if (undefined === this.valueInternal) {
            this.initializeNmea();
        }
        return this.valueInternal;
    }
}
