import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SettingsServiceService } from '../../services/settings-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatTable, 
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
  FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  languages: string[] = ['English', 'French', 'Spanish', 'German'];
  appearances: string[] = ['Light', 'Dark'];
  promptsPerPageOptions: number[]= [2,4,6];
  //promptsPerPageOption = 4;
 selectedPromptsPerPage = '';
  constructor(private router: Router, private settingsServiceService: SettingsServiceService) {} 
  
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

  onPromptsPerPageChange(value: number){
    console.log("hello")
    console.log(value);
    this.settingsServiceService.setPromptsPerPage(value);
  }
}
