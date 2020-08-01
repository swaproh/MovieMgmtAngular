import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieEntity } from 'src/app/app.moviemodel';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent implements OnInit {
  movieForm: FormGroup;
  movie: MovieEntity=new MovieEntity();
  movies:MovieEntity[];
  id: number = this.activatedrouter.snapshot.params['movieId'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;
  RolesArray: any = ['test']
  PersonArray: any = ['test']
  companyArray: any = ['test'];
  countryArray: any = ['test'];
  languageArray: any = ['test'];

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { 
    
  }

  ngOnInit() {
   // for list all operation
    this.readAllMovie();
    // for update operation
    this.dataService.readAllRole().subscribe((rs: any[]) => { this.RolesArray = rs });
    this.dataService.readAllPerson().subscribe((rs: any[]) => { this.PersonArray = rs })
    this.dataService.readAllCompanies().subscribe((rs: any[]) => { this.companyArray = rs });
    this.dataService.readAllLanguages().subscribe((rs: any[]) => { this.languageArray = rs });
    this.dataService.readAllCountries().subscribe((rs: any[]) => { this.countryArray = rs });
    this.movieForm = new FormGroup(
      {
        movieId: new FormControl(''),
        movieName: new FormControl(''),
        personDTO: new FormArray([
          this.initPerson()
        ]),
        movieBasedOn: new FormControl(''),
        productionCompany: new FormArray([
          this.initCompany()
        ]),
        distributedBy: new FormArray([
          this.initCompany()
        ]),
        language: new FormArray([
          this.initLanguage()
        ]),
        country: this.initCountry(),
        releaseDate: new FormControl(''),
        watchDate: new FormControl('')
      }
    );
  }

  initPerson() {
    return new FormGroup({
      personId: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dob: new FormControl(''),
      country: new FormGroup({
        name: new FormControl('')
      }),
      roles: new FormArray([
        new FormGroup({
          roleId: new FormControl(''),
          roleName: new FormControl('')
        })
      ])
    });
  }

  initPersonObject(person) {
    return new FormGroup({
      personId: new FormControl(person.personId),
      firstName: new FormControl(person.firstName),
      lastName: new FormControl(person.lastName),
      dob: new FormControl(''),
      country: new FormGroup({
        name: new FormControl('')
      }),
      roles: new FormArray([
        new FormGroup({
          roleId: new FormControl(person.roles[0].roleId),
          roleName: new FormControl(person.roles[0].roleName)
        })
      ])
    });
  }

  addPersonObject() {
    const control = <FormArray>this.movieForm.get('personDTO');
    //alert('ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length)
    // clear all previous controls
    var controlLen = control.length;
    for(var i=0; i<controlLen; ++i){
      //alert('for:removing control '+(i+1)+" out of "+controlLen)
      control.removeAt(i);
     // alert('for:removing control end '+i)
    }

    // clear the control as dto list is zero so controls should be zero
    controlLen = control.length;
    if(controlLen>0 && this.movie.personDTO.length==0){
      //alert('if:removing control '+0)
      control.removeAt(0);
    }
    
    this.movie.personDTO.forEach(f => {
      control.push(this.initPersonObject(f));
      //alert('in loop')
    });

    //alert(' should add - '+(control.length==0 && this.song.personDTO.length==0)+
    //' ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length);
    // add default control is dto list is zero
    if(control.length==0 && this.movie.personDTO.length==0){
      control.removeAt(0);
      control.push(this.initPerson());
    }
   //alert('end')
  }

  addCompanyProductionObject(){
    const control = <FormArray>this.movieForm.get('productionCompany');
    //alert('ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length)
    // clear all previous controls
    var controlLen = control.length;
    for(var i=0; i<controlLen; ++i){
      //alert('for:removing control '+(i+1)+" out of "+controlLen)
      control.removeAt(i);
     // alert('for:removing control end '+i)
    }

    // clear the control as dto list is zero so controls should be zero
    controlLen = control.length;
    if(controlLen>0 && this.movie.productionCompany.length==0){
      //alert('if:removing control '+0)
      control.removeAt(0);
    }
    
    this.movie.productionCompany.forEach(f => {
      control.push(this.initCompanyObject(f));
      //alert('in loop')
    });

    //alert(' should add - '+(control.length==0 && this.song.personDTO.length==0)+
    //' ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length);
    // add default control is dto list is zero
    if(control.length==0 && this.movie.productionCompany.length==0){
      control.removeAt(0);
      control.push(this.initCompany());
    }
   //alert('end')
  }
  addCompanyDistributionObject(){
    const control = <FormArray>this.movieForm.get('distributedBy');
    //alert('ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length)
    // clear all previous controls
    var controlLen = control.length;
    for(var i=0; i<controlLen; ++i){
      //alert('for:removing control '+(i+1)+" out of "+controlLen)
      control.removeAt(i);
     // alert('for:removing control end '+i)
    }

    // clear the control as dto list is zero so controls should be zero
    controlLen = control.length;
    if(controlLen>0 && this.movie.distributedBy.length==0){
      //alert('if:removing control '+0)
      control.removeAt(0);
    }
    
    this.movie.distributedBy.forEach(f => {
      control.push(this.initCompanyObject(f));
      //alert('in loop')
    });

    //alert(' should add - '+(control.length==0 && this.song.personDTO.length==0)+
    //' ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length);
    // add default control is dto list is zero
    if(control.length==0 && this.movie.distributedBy.length==0){
      control.removeAt(0);
      control.push(this.initCompany());
    }
   //alert('end')
  }
  addLanguageObject(){
    const control = <FormArray>this.movieForm.get('language');
    //alert('ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length)
    // clear all previous controls
    var controlLen = control.length;
    for(var i=0; i<controlLen; ++i){
      //alert('for:removing control '+(i+1)+" out of "+controlLen)
      control.removeAt(i);
     // alert('for:removing control end '+i)
    }

    // clear the control as dto list is zero so controls should be zero
    controlLen = control.length;
    if(controlLen>0 && this.movie.language.length==0){
      //alert('if:removing control '+0)
      control.removeAt(0);
    }
    
    this.movie.language.forEach(f => {
      control.push(this.initLanguageObject(f));
      //alert('in loop')
    });

    //alert(' should add - '+(control.length==0 && this.song.personDTO.length==0)+
    //' ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length);
    // add default control is dto list is zero
    if(control.length==0 && this.movie.language.length==0){
      control.removeAt(0);
      control.push(this.initLanguage());
    }
   //alert('end')
  }

  initCountry() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
    })
  }
  initLanguage() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
    })
  }
  initLanguageObject(lang) {
    return new FormGroup({
      id: new FormControl(lang.id),
      name: new FormControl(lang.name)
    })
  }
  initCompany() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
    })
  }

  initCompanyObject(comp) {
    return new FormGroup({
      id: new FormControl(comp.id),
      name: new FormControl(comp.name)
    })
  }

  getPersonDTO(form) {
    return form.controls.personDTO.controls;
  }

  getRoles(form) {
    return form.controls.roles.controls;
  }

  getProductionCompany(form) {
    return form.controls.productionCompany.controls;
  }

  getDistributedBy(form) {
    return form.controls.distributedBy.controls;
  }

  getLanguage(form) {
    return form.controls.language.controls;
  }

  getCountry(form) {
    return form.controls.country as FormGroup;
  }

  addPerson() {
    const control = <FormArray>this.movieForm.get('personDTO');
    control.push(this.initPerson());
  }

  addProdCompany() {
    const control = <FormArray>this.movieForm.get('productionCompany');
    control.push(this.initCompany());
  }

  addDistCompany() {
    const control = <FormArray>this.movieForm.get('distributedBy');
    control.push(this.initCompany());
  }

  addLanguage() {
    const control = <FormArray>this.movieForm.get('language');
    control.push(this.initLanguage());
  }

  removeLanguage(i) {
    const control = <FormArray>this.movieForm.get('language');
    control.removeAt(i);
  }

  removeProdCompany(i) {
    const control = <FormArray>this.movieForm.get('productionCompany');
    control.removeAt(i);
  }

  removeDistributedBy(i) {
    const control = <FormArray>this.movieForm.get('distributedBy');
    control.removeAt(i);
  }

  removePerson(i) {
    const control = <FormArray>this.movieForm.get('personDTO');
    control.removeAt(i);
  }

  updateMovie(movie){
    this.updateModal = false;
     this.dataService.updateMovie(this.movieForm.value).subscribe(rs=>alert('Movie Updated'),
     err=>{ alert('Exception occured')})
  }

  deleteMovie(id){
    this.dataService.deleteMovie(id).subscribe(rs=>alert('Movie Deleted'),
    err=>{ alert('Exception occured')})
  }

  readAllMovie(){
    
    this.dataService.readAllMovie().subscribe((rs: any[] ) => {this.movies = rs})
  }

  readMovie(id){
    // alert('hii')
    this.updateModal = true;
    this.all=false;
    this.read=true;
    console.log(id);
   
    this.dataService.readMovie(id).subscribe(
      rs=>{
        this.movie=rs,console.log(this.movie);
        // set read values
        this.movieForm.patchValue({
          movieId: rs.movieId,
          movieName: rs.movieName,
          movieBasedOn: rs.movieBasedOn,
          releaseDate: this.formatDate(rs.releaseDate),
          country: rs.country,
          watchDate: this.formatDate(rs.watchDate)
        });
       
        this.addPersonObject();
        this.addCompanyProductionObject();
        this.addCompanyDistributionObject();
        this.addLanguageObject();
      }
      );
  }

  formatDate(iDate: Date) {
    var datePipe = new DatePipe("en-US");
    let formattedDate = datePipe.transform(iDate, 'yyyy-MM-dd');
    return formattedDate;
 }

  closeModal(){
    this.updateModal = false;
    this.viewModal = false;
  }

  viewMovie(id){
    this.viewModal = true;
    this.dataService.readMovie(id).subscribe(rs=>{this.movie=rs,console.log(this.movie);});
  }

}
