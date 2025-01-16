import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import  {RouterModule,RouterLinkActive, RouterOutlet, RouterLink, Router}  from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MatPaginator,MatPaginatorModule,MatInputModule,MatIconModule,
    MatFormFieldModule,FormsModule,RouterOutlet, RouterLink, 
    RouterLinkActive,RouterModule,MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  
 
  constructor(private router: Router,private userService: UserService) {}

  user = {
    image: '',
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country:'',
    zip: ''
  };

  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result; // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(userForm: any): void {
    if (userForm.valid) {
      this.userService.saveUser(this.user).subscribe({
        next: (response) => console.log('Data saved successfully:', response),
        error: (error) => console.error('Error saving data:', error),
      });
    }
  }

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude );
        this.user.address = 'Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}';
      });
      (error: { message: any; }) => {
        console.error('Error detecting location:', error.message);
      }

      } else {
        alert('Geolocation is not supportd by this browser');
      }

    }

   
   

    onCancel(userForm:any) {
      userForm.reset();
    }



}
