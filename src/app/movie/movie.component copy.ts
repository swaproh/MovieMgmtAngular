import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MovieEntity } from '../app.moviemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PersonEntity } from '../app.personmodel';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: MovieEntity=new MovieEntity();
  movies:MovieEntity[];
  id: number = this.activatedrouter.snapshot.params['movieId'];

  movieForm: FormGroup;

  constructor(public dataService: DataService,
    private route:ActivatedRoute,
    private router:Router,
    private activatedrouter: ActivatedRoute,
    private formBuilder: FormBuilder) { }

   // roles Names
  RolesArray: any = ['Actor', 'Actress', 'Director', 'Producer']
  PersonArray: any = ['Imraan Hashmi', 'Bipasha Basu', 'Rahun Gandhi', 'Sachin Tendulkar']
  ngOnInit() {
    /* Initiate the form structure */
   // alert('in ngOnInit')
    this.movieForm = this.formBuilder.group({
      movieId: [],
      movieName: [],
      movieBasedOn: [],
      productionCompanies: this.formBuilder.array([this.formBuilder.group({name:''})]),
      distributionCompanies: this.formBuilder.array([this.formBuilder.group({name:''})]),
      languages: this.formBuilder.array([this.formBuilder.group({name:''})]),
      releaseDate: [],
      watchDate: [],
      crewMembers:this.formBuilder.array([
        this.formBuilder.group(
          {
            person:this.formBuilder.array([this.formBuilder.group({roleDTO:''})]),
            //roleDTO:  ''//this.formBuilder.array([this.formBuilder.group({roleName:''})])
          }
          )])
        });

        this.dataService.readAllRole().subscribe((rs: any[] ) => {this.RolesArray = rs});
        this.dataService.readAllPerson().subscribe((rs: any[] ) => {this.PersonArray = rs})
  }

createMovie(){
  this.movie.movieId = this.movieId.value;
  this.movie.movieName = this.movieName.value;
  this.movie.movieBasedOn = this.movieBasedOn.value;
  this.movie.productionCompany = this.productionCompanies.value;
  this.movie.distributedBy = this.distributionCompanies.value;
  this.movie.language = this.languages.value;
  this.movie.releaseDate = this.releaseDate.value;
  this.movie.watchDate = this.watchDate.value;
  this.movie.personDTO = this.crewMembers.value;
  this.dataService.createMovie(this.movie).subscribe(rs=> alert('Movie inserted succesfully'));
  console.log(this.movie)
}


addCompany(){
 // alert('adding controls');
}

get productionCompanies() {
  return this.movieForm.get('productionCompanies') as FormArray;
}

get movieBasedOn(){
  return this.movieForm.get('movieBasedOn') as FormControl;
}

get movieId(){
  return this.movieForm.get('movieId') as FormControl;
}

get distributionCompanies(){
  return this.movieForm.get('distributionCompanies') as FormArray;
}

get crewMembers(){
  let person = this.movieForm.get('crewMembers') as FormArray;
  return person;
}

get person(){
  let person = this.movieForm.get('crewMembers.person') as FormArray;
  return person;
}

/*get roles(){
  return this.movieForm.get('roles') as FormArray;
}

//spare
get role(){
  return this.movieForm.get('role') as FormArray;
}
}
// Choose city using select dropdown
changeRole(e) {
  this.role.setValue(e.target.value, {
    onlySelf: true
  })*/



get languages(){
  return this.movieForm.get('languages') as FormArray;
}

get movieName(){
  return this.movieForm.get('movieName') as FormControl;
}

get releaseDate(){
  return this.movieForm.get('releaseDate') as FormControl;
}

get watchDate(){
  return this.movieForm.get('watchDate') as FormControl;
}

addProdCompany() {
  this.productionCompanies.push(this.formBuilder.group({prodCompany:''}));
}

addDistCompany(){
  this.distributionCompanies.push(this.formBuilder.group({distributedBy:''}));
}

addLanguage(){
  this.languages.push(this.formBuilder.group({language:''}));
}

addCrewMember(){
  this.crewMembers.push(this.formBuilder.group({person:this.formBuilder.array([this.formBuilder.group({roleDTO:''})]), 
  //roleDTO: ''//this.formBuilder.group({roleName:''})
}
  ));
}

/*
addRole(){

  this.roles.push(this.formBuilder.group({role:''}));
}*/

deleteProdCompany(index) {
  this.productionCompanies.removeAt(index);
}

deleteDistCompany(index) {
  this.distributionCompanies.removeAt(index);
}

deleteLanguage(index) {
  this.languages.removeAt(index);
}

deleteCrewMember(index) {
  this.crewMembers.removeAt(index);
}

/*
deleteRole(index) {
  this.roles.removeAt(index);
}*/
}
