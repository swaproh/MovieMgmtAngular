import { Injectable ,APP_ID, Query } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { MovieEntity } from './app.moviemodel';
import { PersonEntity } from './app.personmodel';
import { RoleEntity } from './app.rolemodel';
import { Company } from './app.companymodel';
import { Language } from './app.LanguageModel';
import { Country } from './app.CountryModel';
import { SongEntity } from './app.SongModel';
import { RaagEntity } from './app.RaagModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:8090';
  object:any

  constructor(private http:HttpClient) { }

  // login
  login(loginPayload)// : Observable<ApiResponse>
  {
    return this.http.post(this.url+'/token/generate-token',loginPayload);
  }
//Movie
  createMovie(movie){

    return this.http.post(this.url+'/movie'+'/create',movie);
  }

  readMovie(id){
    
    return this.http.get<MovieEntity>(this.url+'/movie'+'/read'+'/'+id)
  }

  readAllMovie(pn, ps){
  
    return this.http.get<MovieEntity[]>(this.url+'/movie'+'/readAll?pageNumber='+pn+'&pageSize='+ps);
  }

  updateMovie(movie){
    
    //alert('hello='+movie.movieName+' '+movie.language+' '+movie.movieBasedOn)
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

  readAllPerson(pn, ps){
  
    return this.http.get<PersonEntity[]>(this.url+'/person'+'/readAll?pageNumber='+pn+'&pageSize='+ps);
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

// company
createCompany(company){

  return this.http.post(this.url+'/company'+'/create',company);
}

readCompany(id){
  
  return this.http.get<Company>(this.url+'/company'+'/read'+'/'+id)
}

readAllCompanies(){

  return this.http.get<Company[]>(this.url+'/company'+'/readAll')
}

updateCompany(company){
  
  alert(company.id+' '+company.name);
  return this.http.put(this.url+'/company'+'/update',company)
}

deleteCompany(id){
  return this.http.delete(this.url+'/company'+'/delete'+'/'+id)
}

// language
createLanguage(language){

  return this.http.post(this.url+'/language'+'/create',language);
}

readLanguage(id){
  
  return this.http.get<Language>(this.url+'/language'+'/read'+'/'+id)
}

readAllLanguages(){

  return this.http.get<Language[]>(this.url+'/language'+'/readAll')
}

updateLanguage(language){
  
  alert(language.id+' '+language.name);
  return this.http.put(this.url+'/language'+'/update',language)
}

deleteLanguage(id){
  return this.http.delete(this.url+'/language'+'/delete'+'/'+id)
}

// songs
createSong(song){

  return this.http.post(this.url+'/song'+'/create',song);
}

readSong(id){
  
  return this.http.get<SongEntity>(this.url+'/song'+'/read'+'/'+id)
}

readAllSongs(pn, ps){

  return this.http.get<SongEntity[]>(this.url+'/song'+'/readAll?pageNumber='+pn+'&pageSize='+ps);
}

updateSong(song){
  
  return this.http.put(this.url+'/song'+'/update',song)
}

deleteSong(id){
  return this.http.delete(this.url+'/song'+'/delete'+'/'+id)
}

// country
createCountry(country){

  return this.http.post(this.url+'/country'+'/create',country);
}

readCountry(id){
  
  return this.http.get<Country>(this.url+'/country'+'/read'+'/'+id)
}

readAllCountries(){

  return this.http.get<Country[]>(this.url+'/country'+'/readAll')
}

updateCountry(country){
  
  alert(country.id+' '+country.name);
  return this.http.put(this.url+'/country'+'/update',country)
}

deleteCountry(id){
  return this.http.delete(this.url+'/country'+'/delete'+'/'+id)
}

// raag
createRaag(raag){

  return this.http.post(this.url+'/raag'+'/create',raag);
}

readRaag(id){
  
  return this.http.get<RaagEntity>(this.url+'/raag'+'/read'+'/'+id)
}

readAllRaagas(pn,ps){

  return this.http.get<RaagEntity[]>(this.url+'/raag'+'/readAll?pageNumber='+pn+'&pageSize='+ps);
}

updateRaag(raag){
  
  return this.http.put(this.url+'/raag'+'/update',raag)
}

deleteRaag(id){
  return this.http.delete(this.url+'/raag'+'/delete'+'/'+id)
}

readAllThaatas(){
  return this.http.get<string[]>(this.url+'/raag'+'/thaat/readAll')
}

readAllJaatis(){
  return this.http.get<string[]>(this.url+'/raag'+'/jati/readAll')
}

readAllSamay(){
  return this.http.get<string[]>(this.url+'/raag'+'/samay/readAll')
}
}
