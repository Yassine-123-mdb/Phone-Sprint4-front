import { Type } from "./type.model";

export class Phone {
    id! : number;
    couleur! : string;
    marque! : string;
    prix! : number;
    ram! : number;
    stockage! : number;
    dateCreation! : Date ;
    type?: Type | null;
    }