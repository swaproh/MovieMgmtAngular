import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonEntity } from 'src/app/app.personmodel';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-persondashboard',
  templateUrl: './persondashboard.component.html',
  styleUrls: ['./persondashboard.component.css']
})
export class PersondashboardComponent implements OnInit {
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  person: PersonEntity=new PersonEntity();
  persons: PersonEntity[];
  id: number = this.activatedrouter.snapshot.params['personId'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;
  countryArray: any = ['test'];
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
        this.viewPerson(this.persons[ind].personId);
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
    private activatedrouter: ActivatedRoute) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    // this.dataService.readMovie(this.id).subscribe(rs=>{this.movie=rs})
     //console.log(this.movie);
     this.readAllPerson(this.pageNumber, this.pageSize);
     // for update operation
     this.dataService.readAllCountries().subscribe((rs: any[]) => { this.countryArray = rs });
   }
 
   nextSlide() {
    this.pageNumber=this.pageNumber+1;
    // for list all operation
    this.readAllPerson(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slideNext();
  }

  previousSlide() {
    this.pageNumber=this.pageNumber-1;
    if(this.pageNumber<0){
      this.pageNumber = 0;
    }
    // for list all operation
    this.readAllPerson(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slidePrev();
  }
  slideToThis(index) {
    this.usefulSwiper.swiper.slideTo(index);
  }

   updatePerson(person){
      this.updateModal = false;
      this.dataService.updatePerson(this.person).subscribe(rs=>alert('Person Updated'),
      err=>{ alert('Exception occured')})
   }
 
   deletePerson(id){
     this.dataService.deletePerson(id).subscribe(rs=>alert('Person Deleted'),
     err=>{ alert('Exception occured')})
   }
 
   readAllPerson(pn, ps){
     
     this.dataService.readAllPerson(pn, ps).subscribe((rs: any[] ) => {this.persons = rs})
   }
 
   readPerson(id){
     // alert('hii')
     this.updateModal = true;
     this.viewModal=false;
     this.all=false;
     this.read=true;
     console.log(id);
     this.dataService.readPerson(id).subscribe(rs=>{this.person=rs,console.log(this.person);});
     
     
   }
 
   closeModal(){
     this.updateModal = false;
     this.viewModal = false;
   }

   viewPerson(id){
    this.viewModal = true;
    this.dataService.readPerson(id).subscribe(rs=>{this.person=rs,console.log(this.person);});
  }

}
