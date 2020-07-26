import { Component, OnInit } from '@angular/core';
import { RoleEntity } from '../app.rolemodel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  role:RoleEntity=new RoleEntity();
  roles:RoleEntity[];
  roleData: any;
  constructor(public dataService:DataService, public router:Router) { }

  ngOnInit() {
  }

  createRole(role){
    console.log(this.role);
    this.dataService.createRole(this.role).subscribe(rs=> {
      this.roleData = rs;
      alert('Data Saved...')
    },
    err=>{ alert('Exception occured')});
    
    this.router.navigateByUrl('roleDash');
  }

}
