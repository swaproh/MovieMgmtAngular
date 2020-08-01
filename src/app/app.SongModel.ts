import { MovieEntity } from './app.moviemodel';
import { PersonEntity } from './app.personmodel';
import { RaagEntity } from './app.RaagModel';

export class SongEntity{
    id:number;
    title:string;
    movie:MovieEntity;
    personDTO:PersonEntity[];
    lyrics:string;
    raag: RaagEntity
}