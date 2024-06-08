import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public currentUrl!: string;
  public appPages = [
    { title: 'All Events', url: '/folder/all-events', icon: 'home' },
    { title: 'Dashboard', url: '/folder/dashboard', icon: 'stats-chart' },
    { title: 'Masters', url: '/folder/masters', icon: 'shield' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Settings', url: '/folder/settings', icon: 'settings' },
  ];
  public folder!: string;
  showEventPage: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,private router: Router) {}

  ngOnInit():void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split('?');
        if (urlSegments.length > 0 && urlSegments[0].startsWith('/folder/event')) {
          this.currentUrl = '/folder/event';
        } else {
          this.currentUrl = event.url;
        }
      }
    });
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

  isSelected(url: string): boolean {
    return this.currentUrl === url;
  }
}
