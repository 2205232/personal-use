import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, 
  ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox'
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showPassword: boolean = false;
  showValidation: boolean = false;
  constructor(private uploadService: ChatServiceService ,private router: Router,
    private fb: FormBuilder
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['',
        [ 
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(10),
          this.lowercaseValidator(),
          this.uppercaseValidator(),
          this.numberValidator(),
          this.specialCharValidator(),
          this.minLengthValidator()
      ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }

  lowercaseValidator(): ValidatorFn{
    return (control: AbstractControl) => {
      return /[a-z]/.test(control.value) ? null : { lowercase: true };
    };
  }

  uppercaseValidator(): ValidatorFn{
    return (control: AbstractControl) => {
      return /[A-Z]/.test(control.value) ? null : { uppercase: true };
    };
  }

  numberValidator(): ValidatorFn{
    return (control: AbstractControl) => {
      return /\d/.test(control.value) ? null : { number: true };
    };
  }

  specialCharValidator(): ValidatorFn{
    return (control: AbstractControl) => {
      return /[!@#$%^&*(),.?":{}|<>]/.test(control.value) ? null : { specialChar: true };
    };
  }

  minLengthValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return /^([a-zA-Z0-9@!#$%^&*()]){6,10}$/.test(control.value) ? null : { minlength: true };
      
    };
  }

  passwordMatchValidator(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if( password !== confirmPassword){
      group.get('confirmPassword')?.setErrors({ mismatch: true});
    } else{
      group.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }



  get Password(){
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword(){
    return this.resetPasswordForm.get('confirmPassword');
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  onFocus(){
    this.showValidation = true;
  }

  onBlur(){
    this.showValidation = false;
  }

  onSubmit(){

  }

  goToLogin(){
    this.router.navigate(['/Login']); 
  }
}
