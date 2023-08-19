import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { matchPasswordsValidator } from 'src/app/shared/validators/match-password-validator';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailPattern = "^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  form = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
    phone: ["", [Validators.required]],
    passwordsGroup: this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        rePassword: [""],
      },
      {
        validators: [matchPasswordsValidator("password", "rePassword")],
      }
    ),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  onRegister(){
    const { firstName, lastName, email, phone, passwordsGroup: {password} = {}} = this.form.value;
    this.authService.register(firstName, lastName, email, phone, password);
    this.router.navigate(["/home"])
  }

}
