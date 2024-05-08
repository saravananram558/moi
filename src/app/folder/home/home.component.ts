import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  events:any;
  eventForm!:FormGroup;
  @ViewChild(IonModal) modal!: IonModal;
  showNoData:boolean = false;
  // items: any[] = []
  filteredItems!: any[];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  eventPlace!: string;
  eventName!: string;
  amountCollector!: string;
  collectors!: string[];
  isModalOpen: boolean = false;

  constructor(
    private apiService:ServiceService,
    private router:Router,
    private formBuilder: FormBuilder
  ) { 
    this.filteredItems = this.events;
    this.eventForm = this.formBuilder.group({
      eventPlace: ['', Validators.required],
      eventName: ['', Validators.required],
      amountCollector: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getEvents()
    this.getUsers()
  }
  
  getUsers(){
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        this.collectors = res.map((event:any) => event.userName);
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  filterItems(event: any) {
    const searchTerm = event.target.value
    // Filter items based on search term
    if (searchTerm && searchTerm.trim() !== '') {
      this.apiService.getEventsSearch(searchTerm).subscribe(
        (res: any) => {
          this.events = res.data
          if(this.events?.length){
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

  downloadAsPDF() {
    const overlayPanelElement = document.querySelector('.overlayPanel');

    if (overlayPanelElement) {
      const options = {
        filename: 'overlay_panel_content.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      (html2pdf() as any).from(overlayPanelElement).set(options).save();
    }
  }

  getEvents(){
    this.apiService.getAllEvents().subscribe({
      next: (res: any) => {
        this.events = res
        if(this.events?.length){
          this.showNoData = false;
        }else{
          this.showNoData = true;
        }
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  navigateToEvent(id:number, name:string) {
    this.router.navigate(['/folder/event'], { queryParams: { id: id ,name:name }});
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }  

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.eventName = ''; 
    this.eventPlace = ''; 
    this.amountCollector = ''; 
    this.closeModal()
  }
  
  confirm() {
    if (this.eventForm.valid) { // Check if the form is valid before proceeding
      this.modal.dismiss('confirm');
  
      const payload = {
        eventName: this.eventForm.get('eventName')?.value,
        eventPlace: this.eventForm.get('eventPlace')?.value,
        amountCollector: this.eventForm.get('amountCollector')?.value
      };
  
      console.log(payload, "check payload");
  
      this.apiService.addEvent(payload).subscribe({
        next: (res: any) => {
          if (res) {
            this.getEvents();
            this.eventForm.reset(); // Reset the form
          }
        },
        error: (err: HttpErrorResponse) => {
          // Handle error
        },
      });
    } else {
      // Handle form validation errors or prevent submission if the form is invalid
    }
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
function html2pdf() {
  throw new Error('Function not implemented.');
}

