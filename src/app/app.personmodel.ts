import { RoleEntity } from './app.rolemodel';
import { Country } from './app.CountryModel';

export class PersonEntity{
    personId:number;
    firstName:string;
    lastName:string;
    dob:string;
    country:Country;
    roleDTO: RoleEntity;
}