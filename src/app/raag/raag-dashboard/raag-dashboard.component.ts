import { Component, OnInit } from '@angular/core';
import { RaagEntity } from 'src/app/app.RaagModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwarSamuhEntity } from 'src/app/app.SwarSamuhModel';

@Component({
  selector: 'app-raag-dashboard',
  templateUrl: './raag-dashboard.component.html',
  styleUrls: ['./raag-dashboard.component.css']
})
export class RaagDashboardComponent implements OnInit {

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
  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.dataService.readAllRaagas().subscribe((rs: any[] ) => {this.raagas = rs});
    // for update
    this.dataService.readAllThaatas().subscribe((rs: any[] ) => {this.thaatArray = rs; console.log(rs);});
    this.dataService.readAllJaatis().subscribe((rs: any[] ) => {this.jaatiArray = rs; console.log(rs);});
    this.dataService.readAllSamay().subscribe((rs: any[] ) => {this.samayArray = rs; console.log(rs);});
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

  readAllRaagas(){
    
    this.dataService.readAllRaagas().subscribe((rs: any[] ) => {this.raagas = rs})
  }

  readRaag(id){
    // alert(id+' '+this.id+' '+this.raag.id)
    this.updateModal = true;
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
