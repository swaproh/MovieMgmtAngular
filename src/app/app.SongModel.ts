import { MovieEntity } from './app.moviemodel';
import { PersonEntity } from './app.personmodel';

export class SongEntity{
    id:number;
    title:string;
    movie:MovieEntity;
    singers:PersonEntity[];
    musicDirectors:PersonEntity[];
    lyrics:string;
    lyricist:PersonEntity[];
}