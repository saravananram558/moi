import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Dashboard', url: '/folder/dashboard', icon: 'stats-chart' },
    { title: 'Masters', url: '/folder/masters', icon: 'shield' },
    // { title: '', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' }
  ];
  constructor() {}
}
