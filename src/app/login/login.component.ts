import { Component } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  user = new User();
  constructor(private authService : AuthService,
    private router: Router) { }
    erreur=0;
    onLoggedin(){
      console.log(this.user);
       let isValidUser: Boolean = this.authService.SignIn(this.user);
      if (isValidUser)
      this.router.navigate(['/']);
      else
      //alert('Login ou mot de passe incorrecte!');
        this.erreur=1;  
    }
      
}
