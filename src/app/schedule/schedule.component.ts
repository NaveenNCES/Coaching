import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  scheduleForm: FormGroup;
  slots = [
    '9 AM to 10 AM',
    '10 AM to 11 AM',
    '11 AM to 12 PM',
    '2 PM to 3 PM',
    '3 PM to 4 PM',
    '4 PM to 5 PM'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.scheduleForm = this.fb.group({
      date: ['', Validators.required],
      slot: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      alert('Appointment confirmed!');
      // In real app, navigate or call API here
    } else {
      this.scheduleForm.markAllAsTouched();
    }
  }
}
