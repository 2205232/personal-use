import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = environment.baseurl;
  private apiUrl = 'http://localhost:3000/saveUser';

  constructor(private http: HttpClient) {}

  saveUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  
  verifyToken(token: string) {
    return this.http.post(`${this.baseurl}/verify-token`, { token });
  }

  signInWithGoogle() {
    window.open(`${this.baseurl}/auth/google`, '_self');
  }

  public initGoogleSignIn( callback: (response: any) =>void):void{
    const clientId =environment.googleClientId;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: callback,
    });
    window.google.accounts.id.prompt();
  }
}

