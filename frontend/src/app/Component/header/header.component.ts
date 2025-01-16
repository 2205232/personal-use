import { Component, ViewEncapsulation } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  //encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  username:string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router,private chatSevice:ChatServiceService) { } 

  

  ngOnInit() {     
    this.isLoggedIn = localStorage.getItem('isAuthenticated') === 'true'; 
     this.username  = localStorage.getItem('username') || '';
  }

  userlogin() {  
    this.router.navigate(['/Login']); 
  } 

  userlogout(){
    this.chatSevice.updateAuthenticationStatus(false);
    localStorage.removeItem('username'); 
    localStorage.removeItem('email'); 
    localStorage.removeItem('userId'); 
    this.username='';
    this.isLoggedIn = false; 
    // this.router.navigate(['/dashboard']); 

  }

}
