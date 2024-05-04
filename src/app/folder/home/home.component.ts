import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { EventComponent } from '../event/event.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  // events:any
  eventComponent = EventComponent;
  events: any[] = [
    { name: 'Marriage', place: 'Mannuzhi', totalAmount: 80000 },
    { name: 'Ear Piercing', place: 'Periyanagalur Ayyanar Kovil', totalAmount: 150000 },
    { name: 'Keda vettu', place: 'Kodukur Ayyanar Kovil', totalAmount: 90000 },
    { name: 'Sigaram yellow water', place: 'Thiruvannamalai', totalAmount: 75000 },
    { name: 'Thatha Death', place: 'Mannuzhi', totalAmount: 80500 },
  ];

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.apiService.getAllEvents().subscribe({
      next: (res: any) => {
        this.events = res.data
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  addEvent(){
    let payload = {

    }
    this.apiService.addEvent(payload).subscribe({
      next: (res: any) => {
        this.events = res.data
      },
      error: (err: HttpErrorResponse) => {
      },
    })
  }

  navigateToAddEvent() {
    this.router.navigate(['/folder/event']);
  }
  
  
}
