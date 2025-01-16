import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { FaqComponentComponent } from '../faq-component/faq-component.component';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,SidebarComponent,ChatbotComponent,
    FaqComponentComponent,CommonModule,UploadDocumentComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

    // Variable to track the current component
    currentComponent: string = 'chatbot'; // default is 'chatbot'

    // Method to handle the sidebar event
    onToggleComponent(component: string) {
      this.currentComponent = component;
    }


}
