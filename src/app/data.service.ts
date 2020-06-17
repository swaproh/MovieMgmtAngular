import { Injectable ,APP_ID, Query } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { MovieEntity } from './app.moviemodel';
import { PersonEntity } from './app.personmodel';
import { RoleEntity } from './app.rolemodel';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:8090';
  object:any

  constructor(private http:HttpClient) { }
//Movie
  createMovie(movie){

    return this.http.post(this.url+'/movie'+'/create',movie);
  }

  readMovie(id){
    
    return this.http.get<MovieEntity>(this.url+'/movie'+'/read'+'/'+id)
  }

  readAllMovie(){
  
    return this.http.get<MovieEntity[]>(this.url+'/movie'+'/readAll')
  }

  updateMovie(movie){
    
    alert('hello='+movie.movieName+' '+movie.language+' '+movie.movieBasedOn)
    return this.http.put(this.url+'/movie'+'/update',movie)
  }

  deleteMovie(id){
    return this.http.delete(this.url+'/movie'+'/delete'+'/'+id)
  }


  setObject(objectData:any){
    this.object=objectData;
    
  }

  getObject(){
    return this.object;
  }

  //Person
  createPerson(person){

    return this.http.post(this.url+'/person'+'/create',person);
  }

  readPerson(id){
    
    return this.http.get<PersonEntity>(this.url+'/person'+'/read'+'/'+id)
  }

  readAllPerson(){
  
    return this.http.get<PersonEntity[]>(this.url+'/person'+'/readAll')
  }

  updatePerson(person){
    
    
    return this.http.put(this.url+'/person'+'/update',person)
  }

  deletePerson(id){
    return this.http.delete(this.url+'/person'+'/delete'+'/'+id)
  }



  
  //Role

  createRole(role){

    return this.http.post(this.url+'/role'+'/create',role);
  }

  readRole(id){
    
    return this.http.get<RoleEntity>(this.url+'/role'+'/read'+'/'+id)
  }

  readAllRole(){
  
    return this.http.get<RoleEntity[]>(this.url+'/role'+'/readAll')
  }

  updateRole(role){
    
    alert(role.roleId+' '+role.roleName);
    return this.http.put(this.url+'/role'+'/update',role)
  }

  deleteRole(id){
    return this.http.delete(this.url+'/role'+'/delete'+'/'+id)
  }


  

}
