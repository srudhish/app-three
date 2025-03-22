import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fg: FormGroup;
  isLoggedIn = false;
  isSubmitted = false;

  constructor(private _fb: FormBuilder) {
    this.fg = _fb.group({
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    this.fg.get('password').markAllAsTouched();
    if (this.fg.valid) {
      this.isLoggedIn = true;
      this.fg.get('password').setValue('');
      this.fg.get('password').markAsUntouched();
    }
  }

  logout() {
    this.isLoggedIn = false;
  }
}
