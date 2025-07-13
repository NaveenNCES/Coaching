import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-success',
  standalone: true,
  templateUrl: './cancel-success.component.html',
  styleUrl: './cancel-success.component.css'
})
export class CancelSuccessComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/user-home']);
  }
}
