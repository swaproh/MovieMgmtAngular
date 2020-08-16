import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/app.CountryModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-dashboard',
  templateUrl: './country-dashboard.component.html',
  styleUrls: ['./country-dashboard.component.css']
})
export class CountryDashboardComponent implements OnInit {

  country:Country = new Country();
  countries:Country[];
  updateModal: any = false;
  id: number = this.activatedrouter.snapshot.params['id'];
  all : boolean= true;
  read : boolean= false;

  constructor(private dataService:DataService  ,  private router: Router,
    private activatedrouter: ActivatedRoute) {
      //alert('hi')
     }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.readAllCountries();
  }

  updateCountry(country){
    this.updateModal=false;
    this.dataService.updateCountry(this.country).subscribe(rs=>alert('Country Updated'),
    err=>{ alert('Exception occured')});

  }

  deleteCountry(id){
    this.dataService.deleteCountry(id).subscribe(rs=>{alert('Country Deleted')},
    err=>{ alert('Exception occured')});

  }

  readAllCountries(){
    this.dataService.readAllCountries().subscribe((rs: any[]) => {this.countries = rs;});
  }

  readCountry(id){
    this.updateModal = true;
    this.all= false;
    this.read = true;
    this.dataService.readCountry(id).subscribe(rs=>{this.country=rs, console.log(this.country)});
  }

  closeModal(){
    this.updateModal=false;
  }
}
