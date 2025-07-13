import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Coach {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  gender: 'male' | 'female';
}

// Dummy service to simulate API call
class CoachService {
  getCoaches(): Observable<Coach[]> {
    return of([
      { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' },
      { id: 'CI-0002', name: 'John', phone: '+61 1234567891', specialty: 'Depression Issues', gender: 'male' },
      { id: 'CI-0003', name: 'Mary', phone: '+852 1234567890', specialty: 'Depression Issues', gender: 'female' },
    ]);
  }
}

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  coaches: Coach[] = [];
  coachService = new CoachService();

  constructor(private router: Router) {}

  ngOnInit() {
    this.coachService.getCoaches().subscribe(data => {
      this.coaches = data;
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
}
