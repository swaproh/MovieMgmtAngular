import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean =false;
  constructor(public dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      uname: '',
      password: ''
    });
    document.getElementById('id01').style.display='block';
  }

  onSubmit()
  {
    if(this.loginForm.invalid)
    {
      return;
    }
    const loginPayload = {
      uname: this.loginForm.controls.uname.value,
      password: this.loginForm.controls.password.value
    }
    //this.dataService.
    
    
    this.dataService.login(loginPayload).subscribe((rs: any) => {
     // alert(rs)
      //debugger;
      if(rs.status === 200)
      {
        window.localStorage.setItem('token', rs.result.token);
       // alert(rs);
        document.getElementById('id01').style.display='none';
        this.router.navigate(['navbar']);
      }else{
        this.invalidLogin = true;
        alert('Invalid Credentials - '+rs.message+' status is '+rs.status);
      }
    });
   
  }
}
