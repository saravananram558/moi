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
  showNoData:boolean = false;
  // items: any[] = []
  filteredItems!: any[];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  eventPlace!: string;
  eventName!: string;
  amountCollector!: string;
  collectors: string[] = ['Collector 1', 'Collector 2', 'Collector 3'];

  constructor(
    private apiService:ServiceService,
    private router:Router,
  ) { 
    this.filteredItems = this.events;
  }

  ngOnInit() {
    this.getEvents()
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
function html2pdf() {
  throw new Error('Function not implemented.');
}

