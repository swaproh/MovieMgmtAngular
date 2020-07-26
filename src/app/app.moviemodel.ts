import { Company } from './app.companymodel';
import { PersonEntity } from './app.personmodel';

export class MovieEntity{
    movieId:number;
    movieName:string;
    movieBasedOn:string;
    productionCompany:Company[];
    distributedBy:Company[];
    language:Company[];
    releaseDate:Date;
    watchDate:Date;
    personDTO:PersonEntity[];
    country:Company;
}