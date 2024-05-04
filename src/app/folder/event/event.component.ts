import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent  implements OnInit {
 // events:any
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

 navigateToAddMember() {
   this.router.navigate(['/folder/event']);
 }  

 navigateToEvents(){
  this.router.navigate(['/folder/home']);
 }

}
