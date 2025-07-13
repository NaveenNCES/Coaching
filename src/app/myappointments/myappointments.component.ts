import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myappointments',
  standalone: true,
  templateUrl: './myappointments.component.html',
  styleUrl: './myappointments.component.css'
})
export class MyappointmentsComponent {
  appointment = {
    bookingId: 'BI-0001',
    coachId: 'CI-0001',
    coachName: 'Rose',
    userId: 'UI-0001',
    userName: 'David',
    date: 'Wed Mar 16 2022',
    slot: '9 AM to 10 AM'
  };

  constructor(private router: Router) {}

  reschedule() {
    this.router.navigate(['/reschedule']);
  }

  cancel() {
    this.router.navigate(['/cancel']);
  }

  goBack() {
    this.router.navigate(['/user-home']);
  }
}
