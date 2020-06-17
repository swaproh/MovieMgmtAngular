import { RoleEntity } from './app.rolemodel';

export class PersonEntity{
    personId:number;
    firstName:string;
    lastName:string;
    dob:string;
    country:string;
    roleDTO: RoleEntity;
}