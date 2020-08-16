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

  movie: MovieEntity = new MovieEntity();
  movies: MovieEntity[];
  id: number = this.activatedrouter.snapshot.params['movieId'];

  movieForm: FormGroup;

  constructor(public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  // roles Names
  RolesArray: any = ['test']
  PersonArray: any = ['test']
  companyArray: any = ['test'];
  countryArray: any = ['test'];
  languageArray: any = ['test'];

  ngOnInit() {
    
    this.dataService.readAllRole().subscribe((rs: any[]) => { this.RolesArray = rs });
    this.dataService.readAllPerson(0,5).subscribe((rs: any[]) => { this.PersonArray = rs })
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
  initCompany() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
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
  createMovie() {
    this.movie.movieName = this.movieName.value;
    this.movie.movieBasedOn = this.movieBasedOn.value;
    this.movie.productionCompany = this.getProductionCompany(this.movieForm).value;
    this.movie.distributedBy = this.getDistributedBy(this.movieForm).value;
    this.movie.language = this.getLanguage(this.movieForm).value;
    this.movie.releaseDate = this.releaseDate.value;
    this.movie.watchDate = this.watchDate.value;
    this.movie.country = this.getCountry(this.movieForm).value;
    this.movie.personDTO = this.getPersonDTO(this.movieForm).value;
    this.movie = this.movieForm.value;
    console.log(this.movieForm.value);
    this.dataService.createMovie(this.movieForm.value).subscribe(rs => alert('Movie inserted succesfully'),
    err=>{ alert('Exception occured')});
    console.log(this.movieForm.value);
    this.router.navigateByUrl("movieDash");
  }

  // Choose city using select dropdown

  get movieBasedOn() {
    return this.movieForm.get('movieBasedOn') as FormControl;
  }


  get movieName() {
    return this.movieForm.get('movieName') as FormControl;
  }

  get releaseDate() {
    return this.movieForm.get('releaseDate') as FormControl;
  }

  get watchDate() {
    return this.movieForm.get('watchDate') as FormControl;
  }

  getCountry(form) {
    return form.controls.country as FormGroup;
  }

  get countryName() {
    return ''//this.movieForm.controls['country'].value.get('name');
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
}
