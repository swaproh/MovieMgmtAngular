import { Component, OnInit } from '@angular/core';
import { Country } from '../app.CountryModel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country:Country = new Country();
  countryData:any;
  constructor(public dataService:DataService, public router:Router) { }

  ngOnInit() {
  }

  createCountry(country){
    this.dataService.createCountry(this.country).subscribe((rs:any) => {this.countryData = rs; alert('Data Saved..')},
    err=>{ alert('Exception occured')});
    
    this.router.navigateByUrl("countryDash");
  }
}
