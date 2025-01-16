import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,
  MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isforgotPwd = false;
  isForgotPwdNotification = false;
  constructor(private http: HttpClient, private router: Router,private chatSevice:ChatServiceService) {}

  ngOnInit() { 
  }
  // Hardcoded user credentials (for demonstration purposes)
  private validEmail: string = 'user@gmail.com';
  private validPassword: string = 'user';

  onSubmit() {
    if (this.email === this.validEmail && this.password === this.validPassword) {
      // Store user authentication status in localStorage
      this.chatSevice.updateAuthenticationStatus(true);
      localStorage.setItem('email', 'user@gmail.com');
      localStorage.setItem('username', 'User');
      localStorage.setItem('userId', '2205232');
      this.router.navigate(['/dashboard']);  // Redirect to dashboard after login
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  showForgotPassword(){
    this.isforgotPwd = true;

  }

  redirectToGoogle(){
    const googleAuthUrl = "https://accounts.google.com"
    window.open(googleAuthUrl);
  }

  goToResetPassword(){
   this.isforgotPwd = false;
   this.isForgotPwdNotification = true;
   
  }
}
