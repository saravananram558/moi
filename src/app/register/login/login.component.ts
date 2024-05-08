import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  value: string | undefined;
  loginForm!:FormGroup;
  userName: any;
  password: any;

  constructor(
    private apiService:ServiceService,
    private router:Router,
    private formBuilder: FormBuilder
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
          this.router.navigate(['/folder/all-events']);
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
