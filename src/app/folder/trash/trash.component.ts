import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent  implements OnInit {
  deletedUsers:any;
  deletedEvents:any;
  deletedEventMembers:any;
  selectedDataSet: string = 'deletedEventMembers';
  isAlertOpen: boolean = false;
  alertButtons = ['Remove'];
  noMembersData:boolean = false;
  noUsersData:boolean = false;
  noEventsData:boolean = false;
  eventId!:number;

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getAllDeletedData()
  }

  setOpen(value: boolean, id:any) {
    this.isAlertOpen = value;
    this.eventId = id;
    if(!this.isAlertOpen){
      this.restoreEvent(this.eventId)
    }
  }

  restoreEvent(id:any) {
    this.apiService.restoreEvent(id).subscribe({
      next: (res: any) => {
        this.router.navigate(['/folder/event'], { queryParams: { id: id } });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing event:', err);
        // Handle error
      }
    });
}

  showDeletedUsers() {
    this.selectedDataSet = 'deletedUsers';
  }

  showDeletedEvents() {
    this.selectedDataSet = 'deletedEvents';
  }

  showDeletedEventMembers() {
    this.selectedDataSet = 'deletedEventMembers';
  }

  getAllDeletedData(){
    this.apiService.getDeletedUsers().subscribe({
      next: (res: any) => {
        this.deletedUsers = res
        if(this.deletedUsers.length){
          this.noUsersData = false;
        }else{
          this.noUsersData = true;
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    this.apiService.getDeletedEvents().subscribe({
      next: (res: any) => {
        this.deletedEvents = res
        if(this.deletedEvents.length){
          this.noEventsData = false;
        }else{
          this.noEventsData = true;
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    this.apiService.getDeletedEventmembers().subscribe({
      next: (res: any) => {
        this.deletedEventMembers = res
        if(this.deletedEventMembers.length){
          this.noMembersData = false;
        }else{
          this.noMembersData = true;
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

}
