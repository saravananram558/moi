import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ServiceService } from 'src/app/service/service.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
})
export class MastersComponent  implements OnInit {
  users:any;
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  role!: string;
  mobileNumber!: string;
  showNoData:boolean = false;

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res
        if(this.users?.length){
          this.showNoData = false;
        }else{
          this.showNoData = true;
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.name = ''; 
    this.role = ''; 
    this.mobileNumber = ''; 
  }
  
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    let payload = {
      userName: this.name,
      roleId: this.role,
      mobileNumber: this.mobileNumber
    };
    this.apiService.addUser(payload).subscribe({
      next: (res: any) => {
        if(res){
          this.getUsers();
          this.name = ''; 
          this.role = ''; 
          this.mobileNumber = ''; 
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    })
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
