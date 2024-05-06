import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MastersComponent } from './masters/masters.component';
import { EventComponent } from './event/event.component';
import { TrashComponent } from './trash/trash.component';
import { SharedModule } from 'src/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    SharedModule
  ],
  declarations: [FolderPage, DashboardComponent, HomeComponent, MastersComponent, EventComponent, TrashComponent]
})
export class FolderPageModule {}
