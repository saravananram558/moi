import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    ButtonModule, InputTextModule,PasswordModule
  ],
  exports: [
    OverlayPanelModule,ButtonModule,InputTextModule, ReactiveFormsModule,FormsModule,PasswordModule
  ]
})
export class SharedModule { }
