import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Company } from 'src/app/app.companymodel';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  company:Company = new Company();
  companies:Company[];
  updateModal: any = false;
  id: number = this.activatedrouter.snapshot.params['roleId'];
  all : boolean= true;
  read : boolean= false;

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) {
      //alert('hi')
     }

  ngOnInit() {
    this.readAllCompanies();
  }

  updateCompany(company){
    this.updateModal=false;
    this.dataService.updateCompany(this.company).subscribe(rs=>alert('Company Updated'),
    err=>{ alert('Exception occured')});
  }

  deleteCompany(id){
    this.dataService.deleteCompany(id).subscribe(rs=>alert('Company Deleted'),
    err=>{ alert('Exception occured')});
  }

  readAllCompanies(){
    this.dataService.readAllCompanies().subscribe((rs: any[]) => {this.companies = rs;});
  }

  readCompany(id){
    this.updateModal = true;
    this.all= false;
    this.read = true;
    this.dataService.readCompany(id).subscribe(rs=>{this.company=rs, console.log(this.company)});
  }

  closeModal(){
    this.updateModal=false;
  }
}
