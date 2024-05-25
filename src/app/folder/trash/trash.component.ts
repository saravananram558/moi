import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { FirebaseService, Todo } from 'src/app/service/firebase.service';
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
  isAlertEventMemberOpen: boolean = false;
  isAlertEventOpen: boolean = false;
  isAlertUserOpen: boolean = false;
  eventMemberBtn = ['Remove'];
  eventBtn = ['Remove'];
  userBtn = ['Remove'];
  noMembersData:boolean = false;
  noUsersData:boolean = false;
  noEventsData:boolean = false;
  evenMemberId!:number;
  eventId!:number;
  userId!:number;
  // todo: Todo = {  
  //   name: '',  
  //   notes: ''  
  // };
  
  constructor(
    private apiService:ServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    // private fireService: FirebaseService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getAllDeletedData()
  }

  // ionViewWillEnter() {  
  //   const id = this.activatedRoute.snapshot.paramMap.get('id');  
  //   // if (id) {  
  //   //   this.fireService.getTodo(id).subscribe(todo => {  
  //   //     this.todo = todo;  
  //   //   });  
  //   // }  
  // }  
  
  // addTodo() {  
    
  //   this.fireService.addTodo(this.todo).then(() => {  
  //     console.log(this.todo);
  //     this.router.navigateByUrl('/');  
  //     this.showToast('todo added');  
  //   }, err => {  
  //     this.showToast('There was a some problem in adding your todo :(');  
  //   });  
  // }  
  
  // deleteTodo() {  
  //   this.fireService.deleteTodo(this.todo.id!).then(() => {  
  //     this.router.navigateByUrl('/');  
  //     this.showToast('todo deleted');  
  //   }, err => {  
  //     this.showToast('There was a some problem in deleting your todo :(');  
  //   });  
  // }  
  
  // updateTodo() {  
  //   this.fireService.updateTodo(this.todo).then(() => {  
  //     this.showToast('todo updated');  
  //   }, err => {  
  //     this.showToast('There was a some problem in updating your todo :(');  
  //   });  
  // }  
  
  // showToast(msg:any) {  
  //   this.toastController.create({  
  //     message: msg,  
  //     duration: 2000  
  //   }).then(toast => toast.present());  
  // }

  forEventMembers(value: boolean, id:any) {
    this.isAlertEventMemberOpen = value;
    this.evenMemberId = id;
    if(!this.isAlertEventMemberOpen){
      this.restoreEventMember(this.evenMemberId)
    }
  }

  forEvents(value: boolean, id:any) {
    this.isAlertEventOpen = value;
    this.eventId = id;
    if(!this.isAlertEventOpen){
      this.restoreEvent(this.eventId)
    }
  }

  forUsers(value: boolean, id:any) {
    this.isAlertUserOpen = value;
    this.userId = id;
    if(!this.isAlertUserOpen){
      this.restoreUser(this.userId)
    }
  }

  restoreEventMember(id:any) {
    this.apiService.restoreEventMember(id).subscribe({
      next: (res: any) => {
        this.getAllDeletedData()
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing event:', err);
        // Handle error
      }
    });
  }

  restoreEvent(id:any) {
    this.apiService.restoreEvent(id).subscribe({
      next: (res: any) => {
        this.router.navigate(['/folder/event'], { queryParams: { id: id } });
        this.getAllDeletedData()
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error removing event:', err);
        // Handle error
      }
    });
  }

  restoreUser(id:any) {
    this.apiService.restoreUser(id).subscribe({
      next: (res: any) => {
        this.getAllDeletedData()
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
