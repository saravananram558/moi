import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    OverlayPanelModule,ButtonModule
  ]
})
export class SharedModule { }
