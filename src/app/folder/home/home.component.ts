import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  events:any
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  eventPlace!: string;
  eventName!: string;
  amountCollector!: string;
  // events: any[] = [
  //   { name: 'Marriage', place: 'Mannuzhi', totalAmount: 80000 },
  //   { name: 'Ear Piercing', place: 'Periyanagalur Ayyanar Kovil', totalAmount: 150000 },
  //   { name: 'Keda vettu', place: 'Kodukur Ayyanar Kovil', totalAmount: 90000 },
  //   { name: 'Sigaram yellow water', place: 'Thiruvannamalai', totalAmount: 75000 },
  //   { name: 'Thatha Death', place: 'Mannuzhi', totalAmount: 80500 },
  // ];

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    this.apiService.getAllEvents().subscribe({
      next: (res: any) => {
        this.events = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  navigateToEvent(e:number) {
    this.router.navigate(['/folder/event']);
  }  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.eventName, 'confirm');
    let payload = {
      eventName: this.eventName,
      eventPlace: this.eventPlace,
      amountCollector: this.amountCollector
    };
    this.apiService.addEvent(payload).subscribe({
      next: (res: any) => {
        if(res){
          this.getEvents();
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
