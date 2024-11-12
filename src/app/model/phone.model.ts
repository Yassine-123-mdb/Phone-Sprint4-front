import { Type } from "./type.model";
import { Image } from './image.model';

export class Phone {
    id! : number;
    couleur! : string;
    marque! : string;
    prix! : number;
    ram! : number;
    stockage! : number;
    dateCreation! : Date ;
    type?: Type | null;
    image! : Image;
    imageStr!:string
    images!:Image[];
    }