import { Component, OnInit } from '@angular/core';
import { Company } from '../app.companymodel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company:Company = new Company();
  companyData:any;
  constructor(public dataService:DataService, public router:Router) { }

  ngOnInit() {
  }

  createCompany(company){
    this.dataService.createCompany(this.company).subscribe((rs:any) => {this.companyData = rs; alert('Data Saved...')},
    err=>{ alert('Exception occured')});
    this.router.navigateByUrl("companyDash");
  }

}
