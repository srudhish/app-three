import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { SignupService } from '../services/signup/signup.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  @ViewChild(MatStepper) stepper!: MatStepper;


  isLinear = true;
  stage = 'REGISTER'

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _fb: FormBuilder, private _signup_service: SignupService) {
    this.firstFormGroup = _fb.group({});
    this.secondFormGroup = _fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      subscribe: [false, Validators.required]
    });

    this.secondFormGroup.get('confirmEmail')?.setValidators([Validators.required, this.emailMatchValidator.bind(this)]);

    this.thirdFormGroup = _fb.group({});
  }

  emailMatchValidator(control: any) {
    if (control.value !== this.secondFormGroup.get('email')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  emailMismatch() {
    return this.secondFormGroup.get('confirmEmail')?.hasError('mismatch');
  }

  sbmitForm() {
    let data: User = {
      firstName: this.secondFormGroup.get('firstname').value,
      lastName: this.secondFormGroup.get('lastname').value,
      email: this.secondFormGroup.get('email').value,
      state: this.secondFormGroup.get('state').value,
      subscribe: this.secondFormGroup.get('subscribe').value
    }
    // this.stepper.next();
    this._signup_service.postDetails(data).subscribe((res) => {
      console.log(res);
      if (res) {
        this.stepper.next();
      }
    });
  }
}
