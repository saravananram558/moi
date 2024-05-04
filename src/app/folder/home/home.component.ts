import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  events:any;

  constructor(
    private apiService:ServiceService
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
  
  
}
