import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonesComponent } from './phones/phones.component'; 
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PhoneGuard } from './guard/phone.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { AuthGuard } from './guards/secure.guard';
const routes: Routes = [
  {path: "phones", component : PhonesComponent,canActivate:[AuthGuard],data : {roles:['ADMIN']}},

  {path: "update-phone/:id", component: UpdatePhoneComponent},
  {path: "rechercheParType", component : RechercheParTypeComponent},
  {path: "rechercheParMarque", component : RechercheParMarqueComponent},
  {path: "listeTypes", component : ListeTypesComponent},
  {path: "login", component : LoginComponent},
  {path: "app-forbidden", component : ForbiddenComponent},
  {path:'register',component:RegisterComponent},
  {path : "Add_phones", component : AddPhoneComponent, canActivate:[PhoneGuard]},
  { path: 'verifEmail', component: VerifEmailComponent },



 // Route pour le composant PhonesComponent
  { path: '', redirectTo: '/phones', pathMatch: 'full' }, // Redirection par défaut
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
