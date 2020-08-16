import { SwarSamuhEntity } from './app.SwarSamuhModel';

export class RaagEntity{
    id:number;
    name:string;
    thaat:string;
    varjyaSwar:string;
    jati:string;
    vaadiSwar:string;
    samvaadiSwar:string;
    samay:string;
    aaroh:string;
    avroh:string;
    pakad:string;
    sandarbh:string;
    gat: string;
    swarVistar:SwarSamuhEntity = new SwarSamuhEntity();
    aalapi:SwarSamuhEntity = new SwarSamuhEntity();
    taana:SwarSamuhEntity = new SwarSamuhEntity();
}