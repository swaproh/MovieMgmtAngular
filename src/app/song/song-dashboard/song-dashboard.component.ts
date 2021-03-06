import { Component, OnInit, ViewChild } from '@angular/core';
import { SongEntity } from 'src/app/app.SongModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { MovieEntity } from 'src/app/app.moviemodel';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-song-dashboard',
  templateUrl: './song-dashboard.component.html',
  styleUrls: ['./song-dashboard.component.css']
})
export class SongDashboardComponent implements OnInit {
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  song: SongEntity=new SongEntity();
  songs:SongEntity[];
  id: number = this.activatedrouter.snapshot.params['id'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;

  // for update operations
   // roles Names
   RolesArray: any = ['test']
   PersonArray: any = ['test']
   movieArray: any = ['test']
   raagArray: any = ['test']
   songForm: FormGroup;
   pageNumber: number = 0;
  pageSize: number = 5;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    speed: 400,
    spaceBetween: 100,
    breakpoints: {
      1024: {
        slidesPerView: this.pageSize
      },
      500: {
        slidesPerView: 3
      },
      400: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true,
    on: {
      click: () =>{
        const ind = this.usefulSwiper.swiper.clickedIndex;
        //alert(ind+' '+this.movies[ind].movieName);
        this.viewSong(this.songs[ind].id);
      },
      slideChange: () => {
       // console.log('slideChange Event: Active Slide Index = ', this.usefulSwiper.swiper.activeIndex);
       //alert(this.pageNumber);
      },
      slideChangeTransitionEnd: () => {
        //console.log('slideChange Event');
        //alert('slideChange')
      },
      slideNextTransitionStart: () => {
       // alert('next');
       
      },
      slidePrevTransitionStart: () => {
        //alert('prev');
       
      }
    }
  };

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { 
    
  }

  nextSlide() {
    this.pageNumber=this.pageNumber+1;
    // for list all operation
    this.readAllSongs(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slideNext();
  }

  previousSlide() {
    this.pageNumber=this.pageNumber-1;
    if(this.pageNumber<0){
      this.pageNumber = 0;
    }
    // for list all operation
    this.readAllSongs(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slidePrev();
  }
  slideToThis(index) {
    this.usefulSwiper.swiper.slideTo(index);
  }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.readAllSongs(this.pageNumber, this.pageSize);
    // for update operation
    this.dataService.readAllRole().subscribe((rs: any[]) => { this.RolesArray = rs });
    this.dataService.readAllPerson(0,5).subscribe((rs: any[]) => { this.PersonArray = rs })
    this.dataService.readAllMovie(0,5).subscribe((rs: any[]) => { this.movieArray = rs })
    this.dataService.readAllRaagas(0,5).subscribe((rs: any[]) => {this.raagArray = rs });
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

  getPersonDTO(form) {
    return form.controls.personDTO.controls;
  }

  getRoleDTO(form) {
    return form.controls.roles.controls;
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

  addPerson() {
    const control = <FormArray>this.songForm.get('personDTO');
    control.push(this.initPerson());
  }

  addPersonObject() {
    const control = <FormArray>this.songForm.get('personDTO');
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
    if(controlLen>0 && this.song.personDTO.length==0){
      //alert('if:removing control '+0)
      control.removeAt(0);
    }
    
    this.song.personDTO.forEach(f => {
      control.push(this.initPersonObject(f));
      //alert('in loop')
    });

    //alert(' should add - '+(control.length==0 && this.song.personDTO.length==0)+
    //' ctrllen - '+control.length+' dtolen - '+this.song.personDTO.length);
    // add default control is dto list is zero
    if(control.length==0 && this.song.personDTO.length==0){
      control.removeAt(0);
      control.push(this.initPerson());
    }
   //alert('end')
  }

  removePerson(i) {
    const control = <FormArray>this.songForm.get('personDTO');
    control.removeAt(i);
  }

  updateSong(song){
    this.updateModal = false;
     this.dataService.updateSong(this.songForm.value).subscribe(rs=>alert('Song Updated'),
     err=>{ alert('Exception occured')})
  }

  deleteSong(id){
    this.dataService.deleteSong(id).subscribe(rs=>alert('Song Deleted'),
    err=>{ alert('Exception occured')})
  }

  readAllSongs(pn, ps){
    
    this.dataService.readAllSongs(pn, ps).subscribe((rs: any[] ) => {this.songs = rs; console.log(this.songs);})
  }

  readSong(id){
    // alert('hii')
    this.updateModal = true;
    this.viewModal = false;
    this.all=false;
    this.read=true;
    this.dataService.readSong(id).subscribe(
      rs=>{
        this.song=rs,console.log(this.song);
        // set read values
        this.songForm.patchValue({
          id: rs.id,
          title: rs.title,
          movie: rs.movie!=null? rs.movie : new MovieEntity(),
          lyrics: rs.lyrics,
          //personDTO: rs.personDTO,
          raag: rs.raag
        });
       //alert(this.song.movie);
        this.addPersonObject();
        console.log(rs);
      }
      );
  }

  closeModal(){
    this.viewModal = false;
    this.updateModal = false;
  }

  viewSong(id)
  {
    this.viewModal = true;
    this.dataService.readSong(id).subscribe(rs=>{this.song=rs,console.log(this.song);});
  }

}
