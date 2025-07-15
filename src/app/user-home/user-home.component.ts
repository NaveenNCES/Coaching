import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CoachService } from '../services/coach.service';
import { Coach } from '../services/api.interfaces';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  coaches: Coach[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private coachService: CoachService
  ) {}

  ngOnInit() {
    this.loadCoaches();
  }

  loadCoaches() {
    this.loading = true;
    this.error = '';
    
    this.coachService.getCoaches().subscribe({
      next: (data) => {
        this.coaches = data || [];
        this.loading = false;
        console.log('Coaches loaded successfully:', data);
      },
      error: (error) => {
        this.error = 'Failed to load coaches. Please try again later.';
        this.loading = false;
        console.error('Error loading coaches:', error);
      }
    });
  }

  getProfileImage(gender: 'male' | 'female'): string {
    return gender === 'male' ? 'assets/male.png' : 'assets/female.png';
  }

  bookAppointment() {
    this.router.navigate(['/schedule']);
  }

  onCoachClick(coach: Coach) {
    this.router.navigate(['/user-profile'], { state: { coach } });
  }

  retryLoad() {
    this.loadCoaches();
  }
}
