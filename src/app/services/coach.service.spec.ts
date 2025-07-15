import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoachService } from './coach.service';
import { Coach } from './api.interfaces';
import { environment } from '../../environments/environment';

describe('CoachService', () => {
  let service: CoachService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoachService]
    });
    service = TestBed.inject(CoachService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCoaches', () => {
    it('should return coaches from API when successful', () => {
      const mockCoaches: Coach[] = [
        { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' as const },
        { id: 'CI-0002', name: 'John', phone: '+61 1234567891', specialty: 'Depression Issues', gender: 'male' as const }
      ];

      service.getCoaches().subscribe(coaches => {
        expect(coaches).toEqual(mockCoaches);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCoaches);
    });

    it('should handle wrapped API response format', () => {
      const mockResponse = {
        success: true,
        data: [
          { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' as const }
        ],
        message: 'Coaches retrieved successfully'
      };

      service.getCoaches().subscribe(coaches => {
        expect(coaches).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}`);
      req.flush(mockResponse);
    });

    it('should return dummy data when API fails', () => {
      service.getCoaches().subscribe(coaches => {
        expect(coaches.length).toBeGreaterThan(0);
        expect(coaches[0]).toBeDefined();
        expect(coaches[0].id).toBeDefined();
        expect(coaches[0].name).toBeDefined();
        expect(coaches[0].specialty).toBeDefined();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getCoachById', () => {
    it('should return coach by ID when successful', () => {
      const mockCoach: Coach = {
        id: 'CI-0001',
        name: 'Rose',
        phone: '+44 1234567890',
        specialty: 'Confidence Issues',
        gender: 'female' as const
      };

      service.getCoachById('CI-0001').subscribe(coach => {
        expect(coach).toEqual(mockCoach);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}/CI-0001`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCoach);
    });

    it('should handle wrapped response for single coach', () => {
      const mockResponse = {
        success: true,
        data: {
          id: 'CI-0001',
          name: 'Rose',
          phone: '+44 1234567890',
          specialty: 'Confidence Issues',
          gender: 'female' as const
        },
        message: 'Coach retrieved successfully'
      };

      service.getCoachById('CI-0001').subscribe(coach => {
        expect(coach).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}/CI-0001`);
      req.flush(mockResponse);
    });

    it('should return null when API fails', () => {
      service.getCoachById('CI-0001').subscribe(coach => {
        expect(coach).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}/CI-0001`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getCoachesBySpecialty', () => {
    it('should return coaches filtered by specialty', () => {
      const mockCoaches: Coach[] = [
        { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' as const }
      ];

      service.getCoachesBySpecialty('Confidence Issues').subscribe(coaches => {
        expect(coaches).toEqual(mockCoaches);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}?specialty=Confidence%20Issues`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCoaches);
    });

    it('should handle URL encoding for special characters', () => {
      service.getCoachesBySpecialty('Stress & Anxiety').subscribe(coaches => {
        expect(coaches).toBeDefined();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}?specialty=Stress%20%26%20Anxiety`);
      req.flush([]);
    });

    it('should return empty array when API fails', () => {
      service.getCoachesBySpecialty('Confidence Issues').subscribe(coaches => {
        expect(coaches).toEqual([]);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.coachesEndpoint}?specialty=Confidence%20Issues`);
      req.error(new ErrorEvent('Network error'));
    });
  });
}); 