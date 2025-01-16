import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {RouterModule,RouterLinkActive, RouterOutlet, RouterLink, Router}  from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

 
@Component({
  selector: 'app-faq-component',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, RouterLinkActive,RouterModule,MatIconModule,
    MatExpansionModule,MatToolbarModule,MatButtonModule,MatCardModule

  ],
  templateUrl: './faq-component.component.html',
  styleUrl: './faq-component.component.scss'
})


export class FaqComponentComponent {
  constructor(private router: Router) {}
 
 
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

  faqList = [
     {
       question: 'What is the future of chatbots in insurance?',
       answer: 'The future of chatbots in insurance looks exceptionally bright. With advancements in AI and machine learning, chatbots are set to become more intelligent, personalized, and efficient. They will continue to improve in understanding customer needs, offering customized advice, and handling complex transactions. The integration of chatbots is expected to grow, making them an integral part of the insurance landscape, driven by their ability to enhance customer experience and operational efficiency.',
       expanded: false
     },
     {
      question: 'What are the benefits of an insurance chatbot?',
      answer: 'Insurance chatbots offer numerous benefits, including 24/7 customer support, streamlined claims processing, enhanced data security, multilingual communication, cost reduction, increased agent productivity, improved customer engagement, and efficient lead generation. They simplify complex processes, provide quick and accurate responses, and significantly improve the overall customer service experience in the insurance sector. And with generative AI in the picture now, these conversations are incredibly human-like.',
      expanded: false
      },
     {
      question: 'How does AI help in the insurance industry?',
      answer: 'As AI chatbots and generative AI systems in the insurance industry, we streamline operations by providing precise risk assessments and personalized policy recommendations. The advanced data analytics capabilities aids in fraud detection and automates claims processing, leading to quicker, more accurate resolutions. Through direct customer interactions, we improve the customer experience while gathering insights for product development and targeted marketing. This ensures a responsive, efficient, and customer-centric approach in the ever-evolving insurance sector.',
      expanded: false
      },
     
      {
      question: 'How many insurance companies use chatbots?' ,
      answer: 'While exact numbers vary, a growing number of insurance companies globally are adopting chatbots. The need for efficient customer service and operational agility drives this trend. Chatbots are increasingly being used for a variety of purposes, from customer queries and claims processing to policy recommendations and lead generation, signaling a widespread adoption in the industry.' ,
      expanded: false
      },
 
     ];

     
   

}  

