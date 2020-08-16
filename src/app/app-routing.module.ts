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
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { LanguageDashboardComponent } from './language/language-dashboard/language-dashboard.component';
import { CountryDashboardComponent } from './country/country-dashboard/country-dashboard.component';
import { CountryComponent } from './country/country.component';
import { CompanyComponent } from './company/company.component';
import { LanguageComponent } from './language/language.component';
import { SongComponent } from './song/song.component';
import { RaagComponent } from './raag/raag.component';
import { SongDashboardComponent } from './song/song-dashboard/song-dashboard.component';
import { RaagDashboardComponent } from './raag/raag-dashboard/raag-dashboard.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path:"movie",component:MovieComponent},
  {path:"person",component:PersonComponent},
  {path:"role",component:RoleComponent},
  {path:"company",component:CompanyComponent},
  {path:"language",component:LanguageComponent},
  {path:"country",component:CountryComponent},
  {path:"movieDash",component:MovieDashboardComponent},
  {path:"personDash",component:PersondashboardComponent},
  {path:"roleDash",component:RoledashboardComponent},
  {path:"companyDash",component:CompanyDashboardComponent},
  {path:"languageDash",component:LanguageDashboardComponent},
  {path:"countryDash",component:CountryDashboardComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"song", component:SongComponent},
  {path:"songDash", component:SongDashboardComponent},
  {path:"raag", component:RaagComponent},
  {path:"raagDash", component:RaagDashboardComponent},
  {path:"navbar", component:NavbarComponent},
  {path:"logout", component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


