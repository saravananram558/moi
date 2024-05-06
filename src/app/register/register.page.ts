import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public register!: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.register = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
