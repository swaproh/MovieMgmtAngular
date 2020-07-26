import { Component, OnInit } from '@angular/core';
import { SongEntity } from 'src/app/app.SongModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-dashboard',
  templateUrl: './song-dashboard.component.html',
  styleUrls: ['./song-dashboard.component.css']
})
export class SongDashboardComponent implements OnInit {

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

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.readAllSongs();
    // for update operation
    this.dataService.readAllRole().subscribe((rs: any[]) => { this.RolesArray = rs });
    this.dataService.readAllPerson().subscribe((rs: any[]) => { this.PersonArray = rs })
    this.dataService.readAllMovie().subscribe((rs: any[]) => { this.movieArray = rs })
    this.dataService.readAllRaagas().subscribe((rs: any[]) => {this.raagArray = rs });
  }

  updateSong(song){
    this.updateModal = false;
     this.dataService.updateSong(this.song).subscribe(rs=>alert('Song Updated'),
     err=>{ alert('Exception occured')})
  }

  deleteSong(id){
    this.dataService.deleteSong(id).subscribe(rs=>alert('Song Deleted'),
    err=>{ alert('Exception occured')})
  }

  readAllSongs(){
    
    this.dataService.readAllSongs().subscribe((rs: any[] ) => {this.songs = rs; console.log(this.songs);})
  }

  readSong(id){
    // alert('hii')
    this.updateModal = true;
    this.all=false;
    this.read=true;
    this.dataService.readSong(id).subscribe(rs=>{this.song=rs,console.log(this.song);});
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
