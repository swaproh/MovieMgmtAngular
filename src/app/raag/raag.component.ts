import { Component, OnInit } from '@angular/core';
import { RaagEntity } from '../app.RaagModel';
import { DataService } from '../data.service';

@Component({
  selector: 'app-raag',
  templateUrl: './raag.component.html',
  styleUrls: ['./raag.component.css']
})
export class RaagComponent implements OnInit {

  raag: RaagEntity=new RaagEntity();
  thaatArray: any = ['test'];
  jaatiArray: any = ['test'];
  samayArray: any=['test'];
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.readAllThaatas().subscribe((rs: any[] ) => {this.thaatArray = rs});
    this.dataService.readAllJaatis().subscribe((rs: any[] ) => {this.jaatiArray = rs});
    this.dataService.readAllSamay().subscribe((rs: any[] ) => {this.samayArray = rs});
  }

  createRaag(raag){
    //console.log(this.person);
    this.dataService.createRaag(this.raag).subscribe(
      rs=> alert('raag inserted succesfully'),
      err=>{ alert('Exception occured')}
      );
    
  }

}
