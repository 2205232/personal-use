import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'; 
import { Message } from '../../models/message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { faThumbsUp, faThumbsDown, faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { SettingsServiceService } from '../../services/settings-service.service';

interface PromptCard{
  title: string;
  description: string;
  icon: string;
  route: string
}
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule,
    MatIconModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent  implements AfterViewChecked {
  @ViewChild('chatWindow', { static: false }) chatWindow!: ElementRef;

  faThumbsUp = faThumbsUp;       // Like icon
  faThumbsDown = faThumbsDown;   // Dislike icon
  faCopy = faCopy;               // Copy icon
  faShareAlt = faShareAlt;       // Share icon
  promptsPerPage: number = 4;
  prompts: PromptCard[] = [
    {
      title: 'How',
      description: 'particular transaction of goods and services be taxed',
      icon: 'account_balance',
      route: 'how'
    },
    {
      title: 'What are',
      description: 'the major features of the registration',
      icon: 'account_balance',
      route: 'how'
    },
    {
      title: 'What other',
      description: 'actions would be required from vendors',
      icon: 'account_balance',
      route: 'how'
    },
    {
      title: 'Why',
      description: 'have some goods/services been kept outside',
      icon: 'account_balance',
      route: 'how'
    },
 ]
  
  historyVisible = false;
  searchText: string = '';
  headicon: boolean = false; 
  showgoogle: boolean = true; 
  isLoading: boolean = false; 
  activeChatId: number = 1;
  newchaticon: boolean = false; 
  messages: Message[] = []; 
  userId: string = '';
  historyMessages:any[]=[];

  //isListening: boolean = false;
  //recognition: any;
  //userMessage: string = '';
 
  constructor(private router: Router, private http: HttpClient,
              private chatService: ChatServiceService,
              public voiceRecognitionService: VoiceRecognitionService,
              private settingsService: SettingsServiceService) { } 
 


  ngOnInit() { 
   

    this.voiceRecognitionService.init();

     // Watch active chat changes
     this.chatService.activeChat$.subscribe(chatId => {
      this.activeChatId = chatId;
      this.messages = this.chatService.getMessages(this.activeChatId);
    });
    this.newchaticon = true;
    this.userId = localStorage.getItem('userId')!; 
    this.settingsService.promptsPerPage$.subscribe(value => {
      this.promptsPerPage = value;
    });
    this.getChatHistory1();

    }


    // Scroll to bottom after view is checked
    ngAfterViewChecked() {
      this.scrollToBottom();
    }
  
    // Function to scroll to the bottom of the chat window
    scrollToBottom(): void {
      try {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error while scrolling to bottom:', err);
      }
    }

  toggleHistory() {
      this.historyVisible = !this.historyVisible;
  }
  

  startListening(){
    // const recognition = new (window as any).webkitSpeechRecognition(); 
    // recognition.lang = 'en-IN'; 
    // recognition.interimResults = false; 
    // recognition.onresult = (event: any) => {
    //   this.searchText = event.results[0][0].transcript;
    //   console.log(this.searchText); 
    //   this.sendMessage();
    // }; 
    // recognition.start(); 
    this.voiceRecognitionService.start();
  }
  
  stopRecording() {
    this.voiceRecognitionService.stop();
    this.searchText += this.voiceRecognitionService.text;
    this.voiceRecognitionService.text = ''; // Clear the recognized text after appending to message
    this.sendMessage();
  }
  // processUserMessage(){
  //   if(this.userMessage.trim()){
  //     this.showgoogle = false;
  //     this.headicon = true;
  //     this.isLoading = true;
  //     this.addMessage(this.userMessage, 'user', 'sent');

  //     setTimeout(() => {
  //       const response = 'No response from bot';
  //       this.addMessage(response, 'bot', 'received');
  //       this.isLoading = false;
  //     this.newchaticon = false;
  //     }, 1000);
      
  //     this.userMessage = '';
  //   }
  // }

  sendMessage(){
    const trimmedSearchText = this.searchText.trim();

    if (!trimmedSearchText) return; // Return early if the input is empty

    // Update UI immediately
    this.showgoogle = false;
    this.headicon = true;
    this.isLoading = true;
   // Add user's message using addMessage function
   this.addMessage(trimmedSearchText, 'user', 'sent');

    // const newMessage: Message = { text: trimmedSearchText, sender: 'user',type:'sent'  };
    // this.messages.push(newMessage);

     // Prepare payload
     const payload = {
      prompt: "Find answer to the following query. Reject questions which are irrelevant. Do not add any disclaimer section in the response:",
      text: trimmedSearchText,
      language: "hi-IN",
      datastore: "ondc-bot-ds_1707487778718"
    }; 

 

    this.chatService.sendChatRequest(payload).subscribe(response => {
   
   const botResponse = response?.results?.[0]?.part?.text || 'No response from the bot';

     this.addMessage(botResponse, 'bot', 'received');


      this.isLoading = false;
      this.newchaticon = false;

     
      const userMessage: Message = { text: trimmedSearchText, sender: 'user', type: 'sent' };
      const botMessage: Message = { text: botResponse, sender: 'bot', type: 'received' };
      this.saveToBigQuery2(userMessage, botMessage);
      

     });

    this.searchText = ''; 

  }

  addMessage(text: string, sender: 'user' | 'bot', type: 'sent' | 'received') {
      this.chatService.addMessage(this.activeChatId, text, sender, type);
  }

   // Interaction options
   likeMessage(message: any) {
  }

  dislikeMessage(message: any) {
  }

  copyMessage(messageText: string) {
    navigator.clipboard.writeText(messageText).then(() => {
      alert('Message copied to clipboard!');
    });
  }

  shareMessage(messageText: string) {
    alert(`Sharing message: ${messageText}`);
  }

  saveToBigQuery(userMessage: Message, botMessage: Message) {
    const userid =this.userId;
    this.chatService.saveChat(userMessage, botMessage,userid).subscribe(
      () => {
        console.log('Chat saved to BigQuery');
      },
      (error) => {
        console.error('Error saving chat to BigQuery:', error);
      }
    );
  }
   generateChatTitle = (userMessage: string) => {
    // For now, return the first 10 words from the user message as the title
    const words = userMessage.split(' ').slice(0, 10).join(' ');
    return words.length > 0 ? `Chat: ${words}` : 'Untitled Chat Session';
  };
  saveToBigQuery2(userMessage: Message, botMessage: Message) {
    const chatTitle = this.generateChatTitle(userMessage.text);
    const chatSession = {
      id: Date.now(),  // Generate a unique chat session ID (you can customize this logic)
      title: chatTitle,  // You can set this dynamically based on the context
      date: new Date(),
      messages: [
        { text: userMessage.text, sender: 'user' },
        { text: botMessage.text, sender: 'bot' }
      ],
      userId: this.userId  // Include the userId in the chat session
    };
  
    this.chatService.saveChatHistory(chatSession).subscribe(
      () => {
        this.getChatHistory1();
        console.log('Chat saved to BigQuery');
      },
      (error) => {
        console.error('Error saving chat to BigQuery:', error);
      }
    );
  }

  getChatHistory(): void {
    this.chatService.getChatHistory(this.userId).subscribe(
      (data) => {
        this.historyMessages = data; 
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
  }
  getChatHistory1(): void {
    this.chatService.getChatHistory1(this.userId).subscribe(
      (data) => {
        this.historyMessages = data; 
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
  }

  loadChatMessages(chatId: number, title: string): void {    
    this.chatService.getChatMessagesById(chatId).subscribe(
      (data) => {
        this.messages = data; // List of messages for the selected chat
        this.toggleHistory();
      },
      (error) => {
        console.error('Error loading chat messages:', error);
      }
    );
  }
  clearHistory() {
    this.historyMessages = [];
  }


}