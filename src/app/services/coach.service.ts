import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Coach, ApiResponse } from './api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = `${environment.apiUrl}${environment.coachesEndpoint}`;

  constructor(private http: HttpClient) {}

  /**
   * Get all available coaches
   * @returns Observable<Coach[]>
   */
  getCoaches(): Observable<Coach[]> {
    return this.http.get<ApiResponse<Coach[]>>(this.apiUrl).pipe(
      map(response => {
        console.log('API Response:', response);
        // Handle both direct array response and wrapped response
        if (response && 'data' in response) {
          return response.data;
        }
        return response as Coach[];
      }),
      catchError(error => {
        console.error('Error fetching coaches:', error);
        // Fallback to dummy data if API fails
        return of(this.getDummyCoaches());
      })
    );
  }

  /**
   * Get coach by ID
   * @param id Coach ID
   * @returns Observable<Coach | null>
   */
  getCoachById(id: string): Observable<Coach | null> {
    return this.http.get<ApiResponse<Coach>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        console.log('Coach Details:', response);
        if (response && 'data' in response) {
          return response.data;
        }
        return response as Coach;
      }),
      catchError(error => {
        console.error(`Error fetching coach ${id}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Get coaches by specialty
   * @param specialty Coach specialty
   * @returns Observable<Coach[]>
   */
  getCoachesBySpecialty(specialty: string): Observable<Coach[]> {
    return this.http.get<ApiResponse<Coach[]>>(`${this.apiUrl}?specialty=${encodeURIComponent(specialty)}`).pipe(
      map(response => {
        console.log(`Coaches with specialty ${specialty}:`, response);
        if (response && 'data' in response) {
          return response.data;
        }
        return response as Coach[];
      }),
      catchError(error => {
        console.error(`Error fetching coaches by specialty ${specialty}:`, error);
        return of([]);
      })
    );
  }

  /**
   * Fallback dummy data when API is not available
   * @returns Coach[]
   */
  private getDummyCoaches(): Coach[] {
    return [
      { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' },
      { id: 'CI-0002', name: 'John', phone: '+61 1234567891', specialty: 'Depression Issues', gender: 'male' },
      { id: 'CI-0003', name: 'Mary', phone: '+852 1234567890', specialty: 'Depression Issues', gender: 'female' },
      { id: 'CI-0004', name: 'Sarah', phone: '+1 1234567892', specialty: 'Career Guidance', gender: 'female' },
      { id: 'CI-0005', name: 'Michael', phone: '+49 1234567893', specialty: 'Stress Management', gender: 'male' },
      { id: 'CI-0006', name: 'Emma', phone: '+33 1234567894', specialty: 'Relationship Issues', gender: 'female' }
    ];
  }
} 