export class Satellite {
    private svidInternal: number;
    private elvInternal: number;
    private azInternal: number;
    private cnoInternal: number;

    constructor(svid: number, elv: number, az: number, cno: number) {
        this.svidInternal = svid;
        this.elvInternal = elv;
        this.azInternal = az;
        this.cnoInternal = cno;
    }

    get svid(): number { return this.svidInternal; }
    get elv(): number { return this.elvInternal; }
    get az(): number { return this.azInternal; }
    get cno(): number { return this.cnoInternal; }
}
