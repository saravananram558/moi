import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
 eventId!:number;
 members!:any;

 constructor(
   private apiService:ServiceService,
   private router:Router,
   private route: ActivatedRoute
 ) { }

 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.eventId = params['id'];
    this.getMembers(this.eventId)
  });
 }

 getMembers(id:number){
  this.apiService.getAllMembers(id).subscribe({
    next: (res: any) => {
      this.members = res
    },
    error: (err: HttpErrorResponse) => {
    },
  });
 }

 navigateToEvents(){
  this.router.navigate(['/folder/home']);
 }

 cancel() {
  this.modal.dismiss(null, 'cancel');
}

confirm() {
  this.modal.dismiss(this.name, 'confirm');
  let payload = {
    eventId:this.eventId,
    memberPlace: this.place,
    memberName: this.name,
    memberSurName: this.surName,
    amount: this.amount,
    mobileNumber: this.mobileNumber
  };
  this.apiService.addMember(payload).subscribe({
    next: (res: any) => {
      if(res){
        this.getMembers(this.eventId);
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
