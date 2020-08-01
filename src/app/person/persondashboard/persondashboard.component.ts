import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonEntity } from 'src/app/app.personmodel';

@Component({
  selector: 'app-persondashboard',
  templateUrl: './persondashboard.component.html',
  styleUrls: ['./persondashboard.component.css']
})
export class PersondashboardComponent implements OnInit {

  person: PersonEntity=new PersonEntity();
  persons: PersonEntity[];
  id: number = this.activatedrouter.snapshot.params['personId'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;
  viewModal: any = false;
  countryArray: any = ['test'];
  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { }

  ngOnInit() {
    // this.dataService.readMovie(this.id).subscribe(rs=>{this.movie=rs})
     //console.log(this.movie);
     this.dataService.readAllPerson().subscribe((rs: any[] ) => {this.persons = rs});
     // for update operation
     this.dataService.readAllCountries().subscribe((rs: any[]) => { this.countryArray = rs });
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
 
   readAllPerson(){
     
     this.dataService.readAllPerson().subscribe((rs: any[] ) => {this.persons = rs})
   }
 
   readPerson(id){
     // alert('hii')
     this.updateModal = true;
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
