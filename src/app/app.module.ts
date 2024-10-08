import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { PhonesComponent } from './phones/phones.component';
import { FormsModule } from '@angular/forms';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { HttpClientModule } from '@angular/common/http';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { UpdateTypesComponent } from './update-types/update-types.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    AddPhoneComponent,
    UpdatePhoneComponent,
    RechercheParTypeComponent,
    RechercheParMarqueComponent,
    SearchFilterPipe,
    ListeTypesComponent,
    UpdateTypesComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
