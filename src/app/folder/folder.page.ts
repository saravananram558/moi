import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  showEventPage: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const name = this.activatedRoute.snapshot.queryParamMap.get('name');
    if(this.folder === 'all-events'){
      this.folder = this.folder.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    if(name) {
      this.folder = name;
      this.showEventPage = true;
    }
  }
}
