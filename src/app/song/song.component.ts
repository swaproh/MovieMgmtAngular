import { Component, OnInit } from '@angular/core';
import { SongEntity } from '../app.SongModel';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song: SongEntity = new SongEntity();
  songs: SongEntity[];
  id: number = this.activatedrouter.snapshot.params['id'];

  songForm: FormGroup;

  constructor(public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  // roles Names
  RolesArray: any = ['Actor', 'Actress', 'Director', 'Producer']
  PersonArray: any = ['Imraan Hashmi', 'Bipasha Basu', 'Rahun Gandhi', 'Sachin Tendulkar']
  movieArray: any = ['test']
  raagArray: any = ['test']
  ngOnInit() {
   
    this.dataService.readAllRole().subscribe((rs: any[]) => { this.RolesArray = rs });
    this.dataService.readAllPerson().subscribe((rs: any[]) => { this.PersonArray = rs })
    this.dataService.readAllMovie().subscribe((rs: any[]) => { this.movieArray = rs })
    this.dataService.readAllRaagas().subscribe((rs: any[]) => {this.raagArray = rs });
    this.songForm = new FormGroup(
      {
        id: new FormControl(''),
        title: new FormControl(''),
        personDTO: new FormArray([
          this.initPerson()
        ]),
        movie: new FormGroup({
          movieId: new FormControl(''),
          movieName: new FormControl('')
        }),
        raag: new FormGroup({
          id: new FormControl(''),
          name: new FormControl('')
        }),
        lyrics: new FormControl('')
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

  getPersonDTO(form) {
    return form.controls.personDTO.controls;
  }

  getRoleDTO(form) {
    return form.controls.roles.controls;
  }

  createSong() {
    this.song.id = this.songId.value;
    this.song.title = this.songName.value;
    this.song.lyrics = this.lyrics.value;
    console.log(this.songForm.value);
    this.dataService.createSong(this.songForm.value).subscribe(rs => alert('Song inserted succesfully'),
    err=>{ alert('Exception occured')});

    console.log(this.songForm.value);
    this.router.navigateByUrl("songDash");
  }

  get lyrics() {
    return this.songForm.get('lyrics') as FormControl;
  }

  get songId() {
    return this.songForm.get('id') as FormControl;
  }


  get songName() {
    return this.songForm.get('title') as FormControl;
  }

  getCountry(form) {
    return form.controls.country as FormGroup;
  }

  getMovie(form){
    return form.controls.movie as FormGroup;
  }

  getRaag(form){
    return form.controls.raag as FormGroup;
  }

  get countryName() {
    return ''//this.movieForm.controls['country'].value.get('name');
  }

  get movieId(){
    return this.songForm.get('movieId') as FormControl;
  }

  addPerson() {
    const control = <FormArray>this.songForm.get('personDTO');
    control.push(this.initPerson());
  }

  removePerson(i) {
    const control = <FormArray>this.songForm.get('personDTO');
    control.removeAt(i);
  }
}
