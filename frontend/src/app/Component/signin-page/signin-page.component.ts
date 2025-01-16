import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {

  signinForm: FormGroup;
  showPassword: boolean = false;
  showValidation: boolean = false;
  constructor(private uploadService: ChatServiceService ,private router: Router,
    private fb: FormBuilder
  ) {
    this.signinForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [ 
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(10),
          this.lowercaseValidator(),
          this.uppercaseValidator(),
          this.numberValidator(),
          this.specialCharValidator(),
          this.minLengthValidator(),
         
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
  // passwordMatchValidator(group: FormGroup){
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { notMatching: true };
  // }

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
    return this.signinForm.get('password');
  }

  get confirmPassword(){
    return this.signinForm.get('confirmPassword');
  }

  onSubmit() {
    // if (form.valid) {
    //   const formData = {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     password: this.password,
    //   };

    //   this.uploadService.createAccount(formData).subscribe(
    //     (response) => {
    //       console.log('Account created successfully', response);
    //     },
    //     (error) => {
    //       console.error('Error creating account', error);
    //     }
    //   );
    // }
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

  redirectToGoogle(){
    const googleAuthUrl = "https://accounts.google.com"
    window.open(googleAuthUrl);
  }
  goToLogin(){
    this.router.navigate(['/Login']);   }
}
