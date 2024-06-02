import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService, Login } from 'src/app/service/firebase.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginForm!:FormGroup;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private fireService: FirebaseService,
    private apiService:ServiceService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginApp(){
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.get('userName')!.value,
        password: this.loginForm.get('password')!.value
      };      
      this.apiService.loginTo(payload).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigate(['/folder/all-events']);
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
    } else {
      // Handle form validation errors if needed
      console.error('Form is invalid');
    }
  }
}
