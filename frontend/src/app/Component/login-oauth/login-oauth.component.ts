import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-oauth',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './login-oauth.component.html',
  styleUrl: './login-oauth.component.scss'
})
export class LoginOauthComponent {

  constructor(private authService: UserService, private router: Router) {}

  signInWithGoogle() {
  //  this.authService.signInWithGoogle();
  this.router.navigate(['/Login']); 
  }

}
