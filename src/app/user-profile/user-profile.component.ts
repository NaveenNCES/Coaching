import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  coach: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.coach = nav?.extras.state?.['coach'] || {
      name: 'David',
      id: 'UI-0001',
      dob: 'Jan 01 1994',
      email: 'david@gmail.com',
      phone: '+61 1234567899',
      address: 'Sydney',
      pincode: '2121',
      gender: 'male'
    };
  }

  getProfileImage(gender: 'male' | 'female'): string {
    return gender === 'male' ? 'assets/male.png' : 'assets/female.png';
  }

  goBack() {
    this.router.navigate(['/user-home']);
  }
}
