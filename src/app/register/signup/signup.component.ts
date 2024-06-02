import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService, Login } from 'src/app/service/firebase.service';
import { ServiceService } from 'src/app/service/service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  signupForm!:FormGroup;
  loginBtn:boolean = false;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private apiService:ServiceService,
    private toastController: ToastController
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

  async signupUser(position:'top'){
    if (this.signupForm.valid) {
      const payload = {
        userName: this.signupForm.get('userName')!.value,
        email: this.signupForm.get('email')!.value,
        password: this.signupForm.get('password')!.value,
      };      
      this.apiService.signUpTo(payload).subscribe({
        next: async (res: any) => {
          if (res.success) {
            localStorage.setItem('existEmail', payload.email);
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
            });
            await toast.present();
            this.router.navigate(['/register/login']);
          }else if (!res.success) {
            localStorage.setItem('existEmail', payload.email);
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
              color: 'warning'
            });
            await toast.present();
            this.signupForm.disable()
            this.loginBtn = true;
          }
        },
        error: async (err: any) => {
          localStorage.clear()
          const toast = await this.toastController.create({
            message: 'An error occurred',
            duration: 1500,
            position: position,
            color: 'danger'
          });
          await toast.present();
        }
      })
    }else{
      this.signupForm.markAllAsTouched()
      const toast = await this.toastController.create({
        message: 'Invalid',
        duration: 1500,
        position: position,
        color: 'warning'
      });
      await toast.present();
    }
  }

  async loginUser(position:'top'){
    const email = this.signupForm.get('email')!.value;
    localStorage.setItem('existEmail', email);
    const toast = await this.toastController.create({
      message: 'welcome back! Please login',
      duration: 1500,
      position: position,
    });
    await toast.present();
    this.router.navigate(['/register/login']);
  }
}
