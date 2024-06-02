import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService, Login } from 'src/app/service/firebase.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginForm!:FormGroup;
  signinBtn:boolean = false;
  incorrectPassword:boolean = false;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private fireService: FirebaseService,
    private apiService:ServiceService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    const existEmail = localStorage.getItem('existEmail');
    if (existEmail) {
      this.loginForm.patchValue({ email: existEmail });
      localStorage.removeItem('existEmail');
    }
  }

  async loginApp(position:'top'){
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value
      };      
      this.apiService.loginTo(payload).subscribe({
        next: async (res: any) => {
          if (res.success == 'success') {
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
            });
            await toast.present();
            this.router.navigate(['/folder/all-events']);
          }else if (res.success == 'unknown') {
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
              color: 'danger'
            });
            await toast.present();
            this.incorrectPassword = false;
            // this.loginForm.disable()
            // this.signinBtn = true;
          }
          else if (res.success == 'invalidEmail') {
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
              color: 'warning'
            });
            this.incorrectPassword = false;
            await toast.present();
          }
          else if (res.success == 'invalidPassword') {
            const toast = await this.toastController.create({
              message: res.message,
              duration: 1500,
              position: position,
              color: 'warning'
            });
            this.incorrectPassword = true;
            await toast.present();
          }
        },
        error: async (err: any) => {
          const toast = await this.toastController.create({
            message: 'An error occurred',
            duration: 1500,
            position: position,
            color: 'danger'
          });
          await toast.present();
          this.incorrectPassword = false;
        }
      })
          // this.fireService.loginTo(loginPayload).subscribe(
      //   (res:any) => {  
      //     if(res){
      //       this.router.navigate(['/folder/all-events']);
      //     } else {
      //       console.log('Login failed. Invalid username or password.');
      //     }
      //   },
      //   (error: HttpErrorResponse) => {
      //     console.error('Error fetching search results:', error);
      //   }
      // );
    }else{
      this.loginForm.markAllAsTouched()
      const toast = await this.toastController.create({
        message: 'Invalid',
        duration: 1500,
        position: position,
        color: 'warning'
      });
      await toast.present();
    }
  }

  async signupUser(position:'top'){
    const toast = await this.toastController.create({
      message: 'welcome! Please Sign up',
      duration: 1500,
      position: position,
    });
    await toast.present();
    this.router.navigate(['/register/signup']);
  }
}
