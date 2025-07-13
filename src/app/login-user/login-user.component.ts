import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginUserComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      id: [{ value: 'UI-001', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,10}$/)]]
    });
  }

  onSubmit() {
    const password = this.loginForm.get('password')?.value;
    if (password === 'user@123') {
      this.router.navigate(['/user-home']);
    } else {
      this.loginError = 'Invalid password. Please try again.';
    }
  }
}
