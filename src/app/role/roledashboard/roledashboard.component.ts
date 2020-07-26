import { Component, OnInit } from '@angular/core';
import { RoleEntity } from 'src/app/app.rolemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-roledashboard',
  templateUrl: './roledashboard.component.html',
  styleUrls: ['./roledashboard.component.css']
})
export class RoledashboardComponent implements OnInit {

  
  role:RoleEntity=new RoleEntity();
  roles:RoleEntity[];
  id: number = this.activatedrouter.snapshot.params['roleId'];
  all : boolean= true;
  read : boolean= false;
  updateModal: any = false;

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) { }

    ngOnInit() {
      
       this.dataService.readAllRole().subscribe((rs: any[] ) => {this.roles = rs});
     }
   
     updateRole(role){
      this.updateModal = false;
        this.dataService.updateRole(this.role).subscribe(rs=>alert('Role Updated'),
        err=>{ alert('Exception occured')});
     }
   
     deleteRole(id){
       this.dataService.deleteRole(id).subscribe(rs=>alert('Role Deleted'),
       err=>{ alert('Exception occured')})
     }
   
     readAllRole(){
       
       this.dataService.readAllRole().subscribe((rs: any[] ) => {this.roles = rs})
     }
   
     readRole(id){
       // alert('hii')
       this.updateModal = true;
       this.all=false;
       this.read=true;
       console.log(id);
       this.dataService.readRole(id).subscribe(rs=>{this.role=rs,console.log(this.role);});
       
       
     }
   
     closeModal(){
       this.updateModal = false;
     }
}
