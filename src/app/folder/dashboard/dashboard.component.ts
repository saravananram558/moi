import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  members!:any;
  events: any;
  users: any;
  eventMembers: any;
  selectedDataSet: string = 'events';

  constructor(
    private apiService:ServiceService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { 
    this.getEventChartData()
  }

  showChartEventMembers() {
    this.selectedDataSet = 'eventMembers';
  }

  showChartEvents() {
    this.selectedDataSet = 'events';
  }

  showChartUsers() {
    this.selectedDataSet = 'users';
  }

  getEventChartData(){
    this.apiService.getAllEvents().subscribe({
      next: (res: any) => {
        this.events = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    // this.apiService.getAllMembers(this.eventId).subscribe({
    //   next: (res: any) => {
    //     this.eventMembers = res
    //   },
    //   error: (err: HttpErrorResponse) => {
    //   },
    // });
  }

getEventColor(event: any, index: number): string {
  const colors = ['green-box', 'violet-box', 'orange-box'];
  // Use the index to determine the color based on the repeating pattern
  return colors[index % colors.length];
}
  

}
