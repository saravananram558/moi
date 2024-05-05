import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Dashboard', url: '/folder/dashboard', icon: 'stats-chart' },
    { title: 'Masters', url: '/folder/masters', icon: 'shield' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
  ];
  public currentUrl!: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
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
  }

  isSelected(url: string): boolean {
    // Check if the current URL matches the provided URL
    return this.currentUrl === url;
  }
}
