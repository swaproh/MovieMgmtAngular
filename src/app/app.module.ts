import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDashboardComponent } from './movie/movie-dashboard/movie-dashboard.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { FooterComponent } from './template/footer/footer.component';
import { PersonComponent } from './person/person.component';
import { RoleComponent } from './role/role.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PersondashboardComponent } from './person/persondashboard/persondashboard.component';
import { RoledashboardComponent } from './role/roledashboard/roledashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { LanguageComponent } from './language/language.component';
import { CountryComponent } from './country/country.component';
import { CountryDashboardComponent } from './country/country-dashboard/country-dashboard.component';
import { LanguageDashboardComponent } from './language/language-dashboard/language-dashboard.component';
import { SongComponent } from './song/song.component';
import { SongDashboardComponent } from './Song/song-dashboard/song-dashboard.component';
import { RaagComponent } from './raag/raag.component';
import { RaagDashboardComponent } from './Raag/raag-dashboard/raag-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDashboardComponent,
    NavbarComponent,
    FooterComponent,
    PersonComponent,
    RoleComponent,
    PersondashboardComponent,
    RoledashboardComponent,
    HomeComponent,
    LoginComponent,
    CompanyComponent,
    CompanyDashboardComponent,
    LanguageComponent,
    LanguageDashboardComponent,
    CountryComponent,
    CountryDashboardComponent,
    SongComponent,
    SongDashboardComponent,
    RaagComponent,
    RaagDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
