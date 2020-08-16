import { Component, OnInit, ViewChild } from '@angular/core';
import { RaagEntity } from 'src/app/app.RaagModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwarSamuhEntity } from 'src/app/app.SwarSamuhModel';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-raag-dashboard',
  templateUrl: './raag-dashboard.component.html',
  styleUrls: ['./raag-dashboard.component.css']
})
export class RaagDashboardComponent implements OnInit {
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  raag: RaagEntity=new RaagEntity();
  raagas:RaagEntity[];
  id: number = this.activatedrouter.snapshot.params['id'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;
  thaatArray: any = ['test'];
  jaatiArray: any = ['test'];
  samayArray: any=['test'];
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
        this.viewRaag(this.raagas[ind].id);
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

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.readAllRaagas(this.pageNumber, this.pageSize);
    // for update
    this.dataService.readAllThaatas().subscribe((rs: any[] ) => {this.thaatArray = rs; console.log(rs);});
    this.dataService.readAllJaatis().subscribe((rs: any[] ) => {this.jaatiArray = rs; console.log(rs);});
    this.dataService.readAllSamay().subscribe((rs: any[] ) => {this.samayArray = rs; console.log(rs);});
  }

  nextSlide() {
    this.pageNumber=this.pageNumber+1;
    // for list all operation
    this.readAllRaagas(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slideNext();
  }

  previousSlide() {
    this.pageNumber=this.pageNumber-1;
    if(this.pageNumber<0){
      this.pageNumber = 0;
    }
    // for list all operation
    this.readAllRaagas(this.pageNumber, this.pageSize);
    this.usefulSwiper.swiper.slidePrev();
  }
  slideToThis(index) {
    this.usefulSwiper.swiper.slideTo(index);
  }

  updateRaag(raag){
    this.updateModal = false;
    console.log(this.raag);
     this.dataService.updateRaag(this.raag).subscribe(rs=>alert('Raag Updated'),
     err=>{ alert('Exception occured')}
     );
  }


  deleteRaag(id){
    this.dataService.deleteRaag(id).subscribe(rs=>alert('Raag Deleted'))
  }

  readAllRaagas(pn,ps){
    
    this.dataService.readAllRaagas(pn,ps).subscribe((rs: any[] ) => {this.raagas = rs})
  }

  readRaag(id){
    // alert(id+' '+this.id+' '+this.raag.id)
    this.updateModal = true;
    this.viewModal = false;
    this.all=false;
    this.read=true;
    this.dataService.readRaag(id).subscribe(rs=>{
      this.raag=rs,console.log(this.raag);
      if(this.raag.swarVistar==null)
        this.raag.swarVistar= new SwarSamuhEntity();

        if(this.raag.aalapi==null)
        this.raag.aalapi= new SwarSamuhEntity();

        if(this.raag.taana==null)
        this.raag.taana= new SwarSamuhEntity();
    });
  }

  viewRaag(id){
    this.viewModal = true;
    this.dataService.readRaag(id).subscribe(rs=>{this.raag=rs,console.log(this.raag);});
  }
  closeModal(){
    this.updateModal = false;
    this.viewModal = false;
  }

}
