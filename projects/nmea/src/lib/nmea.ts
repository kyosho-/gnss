// 参考
// https://www.u-blox.com/ja/product/neolea-m8t-series#tab-documentation-resources
// https://www.u-blox.com/sites/default/files/products/documents/u-blox8-M8_ReceiverDescrProtSpec_%28UBX-13003221%29_Public.pdf

// TODO: ハードウェア(ファームウェア)、NMEAバージョン等をどのように吸収するか？

/**
 * NMEA Sentence
 */
// @dynamic
export class Nmea {
    /**
     * NMEA Sentence regex
     */
    public static readonly NMEA_REGEX: RegExp =
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
    constructor() {
    }

    static validate(checksumRange: string, checksum: number): boolean {
        // const checksum: number = parseInt(matched[4], 16);
        let calced = 0;
        // matching checksum
        for (const i of checksumRange) {
            // tslint:disable-next-line: no-bitwise
            calced ^= i.charCodeAt(0);
        }
        // console.log(`${checksum.toString(16)}, ${calced.toString(16)}`);
        return checksum === calced;
    }

    /**
     * parse
     * @param input NMEA line string.
     */
    static parse(input: string): Nmea {
        const nmea: Nmea = new Nmea();

        // matching
        const matched: string[] = input.match(Nmea.NMEA_REGEX);
        const checksumRange = matched[1];
        nmea.address = matched[2];
        nmea.value = matched[3];
        const checksum = parseInt(matched[4], 16);

        if (!this.validate(checksumRange, checksum)) {
            throw new Error(`Checksum is not match. (input=${input})`);
        }

        return nmea;
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
