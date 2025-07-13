import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css'
})
export class CancelComponent {
  constructor(private router: Router) {}

  confirmCancel() {
    this.router.navigate(['/cancel-success']);
  }

  goBack() {
    this.router.navigate(['/myappointments']);
  }
}
