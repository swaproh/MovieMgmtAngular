import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieEntity } from 'src/app/app.moviemodel';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent implements OnInit {

  movie: MovieEntity=new MovieEntity();
  movies:MovieEntity[];
  id: number = this.activatedrouter.snapshot.params['movieId'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;
  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { 
    
  }

  ngOnInit() {
   // this.dataService.readMovie(this.id).subscribe(rs=>{this.movie=rs})
    //console.log(this.movie);
    this.dataService.readAllMovie().subscribe((rs: any[] ) => {this.movies = rs});
  }

  updateMovie(movie){
    this.updateModal = false;
     this.dataService.updateMovie(this.movie).subscribe(rs=>alert('Movie Updated'),
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
    this.dataService.readMovie(id).subscribe(rs=>{this.movie=rs,console.log(this.movie);});
    
    
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
