import { Component, OnInit } from '@angular/core';
import { PersonEntity } from '../app.personmodel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: PersonEntity=new PersonEntity();
  persons: PersonEntity[];
  countryArray: any = ['test'];
  constructor(public dataService: DataService, public router:Router) { }

  ngOnInit() {
    this.dataService.readAllCountries().subscribe((rs: any[] ) => {this.countryArray = rs});
  }

    
createPerson(person){
  //console.log(this.person);
  this.dataService.createPerson(this.person).subscribe(rs=> alert('Person inserted succesfully'),
  err=>{ alert('Exception occured')});
  
  this.router.navigateByUrl("personDash");
}
}
