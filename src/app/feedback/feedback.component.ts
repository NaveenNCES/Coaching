import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  countryCodes = ['+91', '+1', '+44', '+61', '+852'];
  categories = [
    'Confidence Issues',
    'Depression Issues',
    'Overweight Issues',
    'Hypertension Issues'
  ];
  experiences = ['Good', 'Average', 'Bad'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      category: ['', Validators.required],
      experience: ['', Validators.required],
      feedback: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.router.navigate(['/feedback-success']);
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }
}
