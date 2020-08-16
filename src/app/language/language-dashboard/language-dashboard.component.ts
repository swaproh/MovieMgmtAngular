import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/app.LanguageModel';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language-dashboard',
  templateUrl: './language-dashboard.component.html',
  styleUrls: ['./language-dashboard.component.css']
})
export class LanguageDashboardComponent implements OnInit {

  lang:Language = new Language();
  languages:Language[];
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
    this.readAllLanguages();
  }

  updateLanguage(lang){
    this.updateModal=false;
    this.dataService.updateLanguage(this.lang).subscribe(rs=>alert('Language Updated'),
    err=>{ alert('Exception occured')});
  }

  deleteLanguage(id){
    this.dataService.deleteLanguage(id).subscribe(rs=>alert('Language Deleted'),
    err=>{ alert('Exception occured')});
  }

  readAllLanguages(){
    this.dataService.readAllLanguages().subscribe((rs: any[]) => {this.languages = rs;});
  }

  readLanguage(id){
    this.updateModal = true;
    this.all= false;
    this.read = true;
    this.dataService.readLanguage(id).subscribe(rs=>{this.lang=rs, console.log(this.lang)});
  }

  closeModal(){
    this.updateModal=false;
  }

}
