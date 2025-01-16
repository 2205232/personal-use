export interface Message { 
    text: string; 
    sender: 'user' | 'bot'; 
    type : 'received'| 'sent'
  } 

 export  interface Chat {
    chatId: number;
    chatPreview: string;
    chatMessages: Message[];
  }
  