import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent  implements OnInit {
  // events:any
  @ViewChild(IonModal) modal!: IonModal;
  memberPlace!: string;
  memberName!: string;
  memberSurName!: string;
  amount!: number;
  mobileNumber!: number;
  eventId!:number;
  members!:any;
  message: string = '';
  mobileNum:string = '';
  isAlertOpen: boolean = false;
  alertButtons = ['Remove'];
  showNoData:boolean = false;
  isModalOpen: boolean = false;
  memberForm!:FormGroup;
  showUpdateBtn:boolean = false;
  showAddBtn:boolean = false;
  memberId!:number;

  constructor(private apiService:ServiceService,private router:Router,private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    this.memberForm = this.formBuilder.group({
      memberPlace: [''],
      memberName: [''],
      memberSurName: [''],
      amount: [''],
      mobileNumber: ['']
    });
  }

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

  openModal() {
    this.isModalOpen = true;
    this.showUpdateBtn = false;
    this.showAddBtn = true;
  }

  closeModal() {
    this.isModalOpen = false;
  } 

  filterItems(event: any) {
    const searchTerm = event.target.value
    // Filter items based on search term
    if (searchTerm && searchTerm.trim() !== '') {
      this.apiService.getEventMembersSearch(searchTerm).subscribe(
        (res: any) => {
          this.members = res.data
          if(this.members?.length){
            this.showNoData = false;
          }else{
            this.showNoData = true;
          }
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
          // Handle error if needed
        }
      );
      return;
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

 resetForm(){
  this.memberForm.reset()
 }

  cancel() {
    this.isModalOpen = false;
    this.resetForm()
    this.getMembers(this.eventId)
  }

  addMembers() {
    let payload = {
      eventId: this.eventId,
      memberPlace: this.memberForm.get('memberPlace')?.value,
      memberName: this.memberForm.get('memberName')?.value,
      memberSurName: this.memberForm.get('memberSurName')?.value,
      amount: this.memberForm.get('amount')?.value,
      mobileNumber: this.memberForm.get('mobileNumber')?.value
    };
    this.apiService.addMember(payload).subscribe({
      next: (res: any) => {
        if(res){
          this.isModalOpen = false;
          this.showAddBtn = true;
          this.showUpdateBtn = false;
          this.resetForm()
          this.getMembers(this.eventId);
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    })
    // this.apiService.sendSMS('+916383635286', payload).subscribe(
    //   () => console.log('SMS sent successfully'),
    //   error => console.error('Failed to send SMS:', error)
    // );
  }

  updateMember(id:number){
    let updatePayload = {
      memberId:id,
      eventId: this.eventId,
      memberPlace: this.memberForm.get('memberPlace')?.value,
      memberName: this.memberForm.get('memberName')?.value,
      memberSurName: this.memberForm.get('memberSurName')?.value,
      amount: this.memberForm.get('amount')?.value,
      mobileNumber: this.memberForm.get('mobileNumber')?.value
    };
    console.log(updatePayload, "checking payload");
    this.apiService.updateMember(updatePayload).subscribe({ 
      next: (res: any) => {
        if(res){
          this.isModalOpen = false;
          this.showAddBtn = true;
          this.showUpdateBtn = false;
          this.resetForm()
          this.getMembers(this.eventId);
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    })
  }

  openCard(id:number, eId:number){
    this.isModalOpen = true;
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    console.log(id, eId, "check id");
    this.apiService.getMemberById(id, eId).subscribe({
      next: (res:any)=>{
        this.members = res
        if(this.members.length > 0){
          const memberData = this.members[0];
          this.memberId=memberData.id,
          this.memberForm.patchValue({
            memberPlace: memberData.memberPlace,
            memberName: memberData.memberName,
            memberSurName: memberData.memberSurName,
            amount: memberData.amount,
            mobileNumber: memberData.mobileNumber
          });
          this.showNoData = false;
        }else{
          this.showNoData = true;
        }
      },
      error:(err:HttpErrorResponse)=>{

      },
    })    
  }
}
