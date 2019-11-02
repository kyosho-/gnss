import { Message } from './message';

export interface MessageVtg extends Message {
    cogt: number;
    cogtUnit: string;
    cogm: number;
    cogmUnit: string;
    sogn: number;
    sognUnit: string;
    sogk: number;
    sogkUnit: string;
    posMode: string;
}
