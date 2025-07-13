import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-success',
  standalone: true,
  templateUrl: './feedback-success.component.html',
  styleUrl: './feedback-success.component.css'
})
export class FeedbackSuccessComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/user-home']);
  }
}
