import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { PersonComponent } from './person/person.component';
import { RoleComponent } from './role/role.component';
import { MovieDashboardComponent } from './movie/movie-dashboard/movie-dashboard.component';
import { PersondashboardComponent } from './person/persondashboard/persondashboard.component';
import { RoledashboardComponent } from './role/roledashboard/roledashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:"movie",component:MovieComponent},
  {path:"person",component:PersonComponent},
  {path:"role",component:RoleComponent},
  {path:"movieDash",component:MovieDashboardComponent},
  {path:"personDash",component:PersondashboardComponent},
  {path:"roleDash",component:RoledashboardComponent},
  {path:"home",component:HomeComponent},
  {path:"log",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
