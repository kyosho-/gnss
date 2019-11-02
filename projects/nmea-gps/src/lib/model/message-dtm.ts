import { Message } from './message';
import { Datum } from './datum.enum';

export interface MessageDtm extends Message {
    datum: Datum;
    subDatum?: any;
    lat: number;
    NS: string;
    lon: number;
    EW: string;
    alt: number;
    refDatum: Datum;
}
