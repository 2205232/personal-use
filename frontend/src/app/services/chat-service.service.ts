import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient, HttpEventType, HttpParams} from '@angular/common/http';
import { BehaviorSubject, catchError, from, map, of } from 'rxjs';
import { Chat, Message } from '../models/message.model';
import { environment } from '../../environments/environment';
//import { ENVIRONMENT,Environment } from '../shared/environment.module';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  constructor(private http:HttpClient,  
    //@Inject(ENVIRONMENT) private env: Environment
  ) { 

const authStatus = localStorage.getItem('isAuthenticated');
this.isAuthenticated.next(authStatus === 'true');
}

  
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();
  
  // getApiURL(){
  //   return this.env.URL;
  // }

  // getURL(){
  //   return this.env.URL;
  // }
//   private readonly URL = 'https://apps.gcpwkshpdev.com/chat/v2';
//  private apiUrl = 'http://localhost:3000/api';
  // private readonly URL = this.getURL();
  // private apiUrl = this.getApiURL;
  private apiUrl = environment.apiUrl;
  private readonly URL=environment.URL;
  private uploadapiUrl = 'http://localhost:3000/api/upload';
  private createaccountapiUrl = 'http://localhost:3000/api/create-account'; // Your backend URL

  

  private chatsBackup: Chat[] = [{ chatId: 1, chatPreview: '', chatMessages: [] }]; 
  private chatCounter = 1;
  private activeChatId = new BehaviorSubject<number>(1);  // BehaviorSubject to track active chat ID

  // Observable to watch changes in active chat
  activeChat$ = this.activeChatId.asObservable();

  // Get all chats
  getChats() {
    return this.chatsBackup;
  }

 

  // Create a new chat
  createNewChat() {
    // if (this.chatsBackup.length >= 5) {
    //   alert('Limit is not more than 5 chats.');
    //   return;
    // }

    this.chatCounter++;
    this.chatsBackup.push({ chatId: this.chatCounter, chatPreview: '', chatMessages: [] });
    this.setActiveChat(this.chatCounter);
  }

  // Set the active chat
  setActiveChat(chatId: number) {
    this.activeChatId.next(chatId);
  }

  // Get messages for active chat
  getMessages(chatId: number): Message[] {
    const chat = this.chatsBackup.find(chat => chat.chatId === chatId);
    return chat ? chat.chatMessages : [];
  }

  // Add message to active chat
  addMessage(chatId: number, message: string, sender: 'user' | 'bot', type: 'sent' | 'received') {
    const chat = this.chatsBackup.find(chat => chat.chatId === chatId);
    if (chat) {
      chat.chatMessages.push({text: message, sender, type });
      this.updateChatPreview(chat);
    }
  }

  // Update the preview text for the chat
  updateChatPreview(chat: Chat) {
    if (chat.chatMessages.length > 0) {
      const firstMessage = chat.chatMessages[0].text;
      const words = firstMessage.split(' ').slice(0, 5).join(' ');
      chat.chatPreview =  words.length > 0 ? ` ${words}` : 'Untitled Chat Session';
    }
  }

  updateAuthenticationStatus(status: boolean) {
    localStorage.setItem('isAuthenticated', status.toString());
    this.isAuthenticated.next(status);
  }
  
  sendChatRequest(payload: any): Observable<any> {
    return this.http.post<any>(this.URL, payload).pipe(
      catchError(error => {
        console.error('Error caught in ChatService:', error);
        return of({ error: 'Error in API call: ' + error.message });
         // Return fallback observable with error
      })
    );
  }

  saveChat(userMessage: Message, botMessage: Message,userid:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-chat`, { userMessage, botMessage,userid });
  }
  saveChatHistory(chatSession: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-chat1`, chatSession);
  }

  getChatHistory(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId); // Add userId as a query parameter
    return this.http.get(`${this.apiUrl}/chat-history`, { params });
  }
  getChatHistory1(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId); // Add userId as a query parameter
    return this.http.get(`${this.apiUrl}/chat-history1`, { params });
  }
  getChatMessagesById(chatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat-history/${chatId}`);
  }

  uploadFiles(files: File[]): Observable<any> {
    console.log(files);
    const formData = new FormData();
    // Array.from(files).forEach(file => {
    //   formData.append('file', file);
    // });
    for (const file of files){
      formData.append('files', file)
    }
  formData.forEach((value,key) => {
    console.log(key, value)
  }
);
    return this.http.post<any>('/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event))
    );
    }

  // Function to upload via URL
  uploadUrl(url: string): Observable<any> {
    const payload = { url };
    return this.http.post<any>('/api/upload-url', payload);
  }

  // Helper to process HTTP events
  private getEventMessage(event: any) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          return { progress: Math.round(100 * event.loaded / event.total) };
        }
        return { progress: 0 };
      case HttpEventType.Response:
        return { message: 'File uploaded successfully', progress: 100 };
      default:
        return { progress: 0 };
    }
  }

  getFiles(): Observable<any> {
    const uploadUrl = 'http://localhost:3000/api/files';
    return this.http.get(uploadUrl);
  }

   // Method to create a new account by sending data to the backend API
   createAccount(accountData:any): Observable<any> {
    return this.http.post(this.createaccountapiUrl, accountData);
  }  

  // Search chat history by keyword
  searchChatHistory(keyword: string): { chatId: number, chatPreview: string, chatMessages: Message[] }[] {
    const lowerKeyword = keyword.toLowerCase();

    // Filter chat messaged based on the keyword
    return this.chatsBackup
     .map(chat => {
      const filteredMessages = chat.chatMessages.filter(message =>
         message.text.toLowerCase().includes(lowerKeyword)
      );
     
      // Update the chat preview if there are any filtered messages
      if(filteredMessages.length > 0){
        this.updateChatPreview(chat)
      }
      return{
        chatId: chat.chatId,
        chatPreview: chat.chatPreview,
        chatMessages: filteredMessages
      }
     })
      .filter(chat => chat.chatMessages.length > 0);
  }

  deleteDocument(documentId: string){
    return this.http.delete('/api/documents/${documentId}');
  }

  downloadDocument(documentId: string){
    return this.http.get('/api/documents/${documentId}', {
      responseType: 'blob'
    });
  }

}
