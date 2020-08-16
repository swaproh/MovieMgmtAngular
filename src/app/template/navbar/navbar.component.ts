import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor() { 
    
  }

  ngOnInit() {
    
    let token = window.localStorage.getItem('token');
    if(token)
    {
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  //  alert(this.loggedIn)
  }


  
}
