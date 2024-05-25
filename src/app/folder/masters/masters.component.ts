import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { ServiceService } from 'src/app/service/service.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Observable } from 'rxjs';  
import { FirebaseService, Todo } from 'src/app/service/firebase.service';

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
  public todos!: Observable<Todo[]>;  
  
  constructor(
    private apiService:ServiceService,
    private router:Router,
    private toastController: ToastController,
    private fireService: FirebaseService
  ) { }

  ngOnInit() {
    this.getUsers()
    this.todos = this.fireService.getTodos();  
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
  
  confirm(position: 'top') {
    this.modal.dismiss(this.name, 'confirm');
    let payload = {
      userName: this.name,
      roleId: this.role,
      mobileNumber: this.mobileNumber
    };
    this.apiService.addUser(payload).subscribe({
      next: async (res: any) => {
        if(res){
          this.getUsers();
          this.name = ''; 
          this.role = ''; 
          this.mobileNumber = ''; 
          const toast = await this.toastController.create({
            message: 'User Added Successfully',
            duration: 1500,
            position: position,
          });
          await toast.present();
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
