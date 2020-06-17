import { Component, OnInit } from '@angular/core';
import { PersonEntity } from '../app.personmodel';
import { DataService } from '../data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: PersonEntity=new PersonEntity();
  persons: PersonEntity[];
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

    
createPerson(person){
  //console.log(this.person);
  this.dataService.createPerson(this.person).subscribe(rs=> alert('Person inserted succesfully'));
  
}
}
