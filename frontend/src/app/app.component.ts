import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './Component/chat-window/chat-window.component';
import { EnvironmentModule } from './shared/environment.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChatWindowComponent,
   
    CommonModule,FormsModule, EnvironmentModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})

export class AppComponent {
  
  
}
