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

  navigateToEvent(id:number) {
    this.router.navigate(['/folder/event'], { queryParams: { id: id } });
  }  

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.eventName = ''; 
    this.eventPlace = ''; 
    this.amountCollector = ''; 
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
          this.eventName = ''; 
          this.eventPlace = ''; 
          this.amountCollector = ''; 
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
