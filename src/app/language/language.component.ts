import { Component, OnInit } from '@angular/core';
import { Language } from '../app.LanguageModel';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  lang:Language = new Language();
  languages:any;
  constructor(public dataService:DataService, public router:Router) { }

  ngOnInit() {
  }

  createLanguage(lang){
    this.dataService.createLanguage(this.lang).subscribe((rs:any) => {this.languages = rs; alert('Data Saved...')},
    err=>{ alert('Exception occured')});
    this.router.navigateByUrl("languageDash");
  }


}
