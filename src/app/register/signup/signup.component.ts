import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService, Login } from 'src/app/service/firebase.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  value: string | undefined;
  signupForm!:FormGroup;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private apiService:ServiceService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  confirmPasswordValidator() {
    const passwordControl = this.signupForm.get('password');
    const confirmPasswordControl = this.signupForm.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  signupUser(){
    if (this.signupForm.valid) {
      const payload = {
        userName: this.signupForm.get('userName')!.value,
        email: this.signupForm.get('email')!.value,
        password: this.signupForm.get('password')!.value,
      };      
      this.apiService.signUpTo(payload).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigate(['/register/login']);
          } else {
            console.log('Login failed. Invalid username or password.');
            // Handle login failure (e.g., display error message)
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching search results:', error);
          // Handle error if needed
        }
      );
    } else {
    // Handle form validation errors if needed
    console.error('Form is invalid');
    }
  }
}
