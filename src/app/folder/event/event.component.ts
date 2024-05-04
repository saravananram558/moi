import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent  implements OnInit {
 // events:any
 @ViewChild(IonModal) modal!: IonModal;

 message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
 place!: string;
 name!: string;
 surName!: string;
 amount!: number;
 mobileNumber!: number;
 members: any[] = [
   { name: 'Karthikesan', place: 'Mannuzhi', amount: 1000 },
   { name: 'Gokul', place: 'Periyanagalur Ayyanar Kovil', amount: 1500 },
   { name: 'Ragul', place: 'Kodukur Ayyanar Kovil', amount: 500 },
   { name: 'Haridha', place: 'Thiruvannamalai', amount: 500 },
   { name: 'Saravanan', place: 'Mannuzhi', amount: 100 },
 ];

 constructor(
   private apiService:ServiceService,
   private router:Router,
 ) { }

 ngOnInit() {
  //  this.apiService.getAllEvents().subscribe({
  //    next: (res: any) => {
  //      this.members = res.data
  //    },
  //    error: (err: HttpErrorResponse) => {
  //    },
  //  });
 }

 addEvent(){
   let payload = {

   }
   this.apiService.addEvent(payload).subscribe({
     next: (res: any) => {
       this.members = res.data
     },
     error: (err: HttpErrorResponse) => {
     },
   })
 }

 navigateToEvents(){
  this.router.navigate(['/folder/home']);
 }

 cancel() {
  this.modal.dismiss(null, 'cancel');
}

confirm() {
  this.modal.dismiss(this.name, 'confirm');
  // this.apiService.addMember
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    // this.message = `Hello, ${ev.detail.data}!`;
  }
}

}
