import { Component,EventEmitter, Output , Input, viewChild, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Message } from '../../models/message.model';  
import { ChatServiceService } from '../../services/chat-service.service';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule,MatInputModule,MatFormFieldModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {

    // Output event to notify parent component
  //@Output() toggleComponent = new EventEmitter<string>();
  
  isModalopen:boolean=false;
  keyword: string = '';
  chatsBackup: { chatId: number, chatPreview: string, chatMessages: Message[] }[] = []; //2496400
  searchSubject: Subject<string> = new Subject();// Subject to debounce search inputs 2496400
  activeChatId: number = 1;
  username:string = '';
  email:string = '';
  isLoggedIn: boolean = false; 
  newchaticon:boolean=false; 
  isSearchActive: boolean = false;
  chatCounter: number = 0; 
  
  // chatsBackup: { chatId: number, chatPreview: string, chatMessages: Message[] }[] = []; 

  constructor( private chatService :ChatServiceService, private router: Router ) { } 

  openModal(){
    this.isModalopen=true;
  }
  closeModal(){
    this.isModalopen=false;
  }
  userProfile(){
    this.router.navigate(['/UserProfile']);  
  }

  ngOnInit() {
    this.username  = localStorage.getItem('username') || '';
    this.email = localStorage.getItem('email') || '';
    this.chatService.isAuthenticated$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.chatsBackup = this.chatService.getChats();
    this.chatService.activeChat$.subscribe(chatId => this.activeChatId = chatId);
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe((searchKeyword) =>{
      this.chatsBackup = this.chatService.searchChatHistory(this.keyword);
    });
  }
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;   

    // Reset input
    if (!this.isSearchActive) {
      this.keyword = ''; 
     
    }
  }
  userlogin() {  
    this.router.navigate(['/Login']); 
  } 

  userlogout(){
    this.chatService.updateAuthenticationStatus(false);
    localStorage.removeItem('username'); 
    localStorage.removeItem('email'); 
    localStorage.removeItem('userId'); 
    this.username='';
    this.isLoggedIn = false; 
    this.chatsBackup = [];
    this.router.navigate(['/dashboard']); 
    
  }
  createNewChat() {
    this.chatService.createNewChat();
  }

  selectChat(chatId: number) {
    this.chatService.setActiveChat(chatId);
  }

  openFaq() {
    this.router.navigate(['/FAQ']); 
  }

  uploadDoc() {
    this.router.navigate(['/uploadDoc']); 
  }

  settings(){
    this.router.navigate(['/settings']); 
  }

  onSearchInput(keyword: string) {
    this.searchSubject.next(keyword);
  }
 
}