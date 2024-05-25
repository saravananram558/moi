import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrashRoutingModule } from './trash-routing.module';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule,
    TrashRoutingModule
  ],
  providers:[FirebaseService]
})
export class TrashModule { }
