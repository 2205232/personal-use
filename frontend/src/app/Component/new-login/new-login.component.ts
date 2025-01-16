import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-new-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-login.component.html',
  styleUrl: './new-login.component.scss'
})
export class NewLoginComponent  {
  private clientId = 'YOUR_GOOGLE_CLIENT_ID';

  constructor(private authService: UserService) {}

  ngOnInit() {
    alert("hii")
    // Ensure Google library is loaded before using it
    const scriptLoaded = !!window.google?.accounts;
    if (!scriptLoaded) {
      console.error('Google Identity Services library not loaded.');
    }
  }

  // ngOnInit(){
   
  //   window['handleCredentialResponse'] = (response: any) => {
  //     const token = response.credential;
  //     this.verifyLogin(token);
  //   };
  // }

  // verifyLogin(token: string) {
  //   this.authService.verifyToken(token).subscribe(
  //     (res) => {
  //       console.log('Login successful:', res);
  //     },
  //     (err) => {
  //       console.error('Login failed:', err);
  //     }
  //   );
  // }

  // redirectToGoogle(){
  //   const googleAuthUrl = "https://accounts.google.com"
  //   window.open(googleAuthUrl);
  // }

  redirectToGoogle() {
    if (window.google?.accounts) {
      this.authService.initGoogleSignIn( (response: any) => {
        if (response.credential) {
          console.log('Google User:', response);
          this.handleUserResponse(response.credential);
        }
      });
    } else {
      console.error('Google library is not available. Please check your setup.');
    }
  }

 
  private handleUserResponse(token: string) {
    fetch('http://localhost:3000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => console.log('User data stored:', data))
      .catch((error) => console.error('Error:', error));
  }
}