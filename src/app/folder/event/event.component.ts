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
 place!: string;
 name!: string;
 surName!: string;
 amount!: number;
 mobileNumber!: number;
 eventId!:number;
 members!:any;
 message: string = '';
 mobileNum:string = '';
 successMessage: string = '';
 errorMessage: string = '';
 isAlertOpen: boolean = false;
 alertButtons = ['Remove'];
 showNoData:boolean = false;

 constructor(private apiService:ServiceService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.queryParams.subscribe(params => {
     this.eventId = params['id'];
     this.getMembers(this.eventId)
   });
  }

  setOpen(value: boolean) {
    this.isAlertOpen = value;
    if(!this.isAlertOpen){
      this.removeEvent()
    }
  }
  
  removeEvent() {
      this.apiService.removeEvent(this.eventId).subscribe({
        next: (res: any) => {
          this.router.navigate(['/folder/all-events']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error removing event:', err);
          // Handle error
        }
      });
  }

 getMembers(id:number){
  this.apiService.getAllMembers(id).subscribe({
    next: (res: any) => {
      this.members = res
      if(this.members.length){
        this.showNoData = false;
      }else{
        this.showNoData = true;
      }
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error fetching members:', err);
    }
  });
 }

 navigateToEvents(){
  this.router.navigate(['/folder/all-events']);
 }

 cancel() {
  this.modal.dismiss(null, 'cancel');
  this.place = '';
  this.name = '';
  this.surName = '';
  this.amount = 0;
  this.mobileNumber = 0;
}

confirm() {
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
        this.place = '';
        this.name = '';
        this.surName = '';
        this.amount = 0;
        this.mobileNumber = 0;
        this.modal.dismiss(payload, 'confirm');
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

  sendMessage(): void {
    this.apiService.sendMessage(this.mobileNum, this.message).subscribe({
      next: (res: any) => {
        this.successMessage = 'Message sent successfully!';
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
      },
    })

  }
}
