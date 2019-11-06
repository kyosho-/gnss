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
     * Address
     */
    protected address: string;

    /**
     * Value
     */
    protected value: string;

    /**
     * Constructor.
     */
    constructor(line: string) {
        const matched: string[] = line.match(Nmea.NMEA_REGEX);
        const checksumRange = matched[1];
        this.address = matched[2];
        this.value = matched[3];

        const checksum = parseInt(matched[4], 16);
        if (!Nmea.validate(checksumRange, checksum)) {
            throw new Error(`Checksum is not match. (line=${line})`);
        }
    }

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
     * get address.
     */
    getAddress(): string {
        return this.address;
    }

    /**
     * get value.
     */
    getValue(): string {
        return this.value;
    }
}
