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

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.getAllDeletedData()
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
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    this.apiService.getDeletedEvents().subscribe({
      next: (res: any) => {
        this.deletedEvents = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
    this.apiService.getDeletedEventmembers().subscribe({
      next: (res: any) => {
        this.deletedEventMembers = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

}
