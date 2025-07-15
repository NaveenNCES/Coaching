import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserHomeComponent } from './user-home.component';
import { CoachService } from '../services/coach.service';
import { Coach } from '../services/api.interfaces';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let router: jasmine.SpyObj<Router>;
  let coachService: jasmine.SpyObj<CoachService>;

  const mockCoaches: Coach[] = [
    { id: 'CI-0001', name: 'Rose', phone: '+44 1234567890', specialty: 'Confidence Issues', gender: 'female' as const },
    { id: 'CI-0002', name: 'John', phone: '+61 1234567891', specialty: 'Depression Issues', gender: 'male' as const }
  ];

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const coachServiceSpy = jasmine.createSpyObj('CoachService', ['getCoaches']);

    await TestBed.configureTestingModule({
      imports: [UserHomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CoachService, useValue: coachServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    coachService = TestBed.inject(CoachService) as jasmine.SpyObj<CoachService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.coaches).toEqual([]);
    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
  });

  describe('ngOnInit', () => {
    it('should call loadCoaches on initialization', () => {
      spyOn(component, 'loadCoaches');
      component.ngOnInit();
      expect(component.loadCoaches).toHaveBeenCalled();
    });
  });

  describe('loadCoaches', () => {




    it('should reset error when retrying', () => {
      component.error = 'Previous error';
      coachService.getCoaches.and.returnValue(of(mockCoaches));
      
      component.loadCoaches();
      
      expect(component.error).toBe('');
    });
  });

  describe('getProfileImage', () => {
    it('should return male profile image for male gender', () => {
      const result = component.getProfileImage('male');
      expect(result).toBe('assets/male.png');
    });

    it('should return female profile image for female gender', () => {
      const result = component.getProfileImage('female');
      expect(result).toBe('assets/female.png');
    });
  });

  describe('bookAppointment', () => {
    it('should navigate to schedule page', () => {
      component.bookAppointment();
      expect(router.navigate).toHaveBeenCalledWith(['/schedule']);
    });
  });

  describe('onCoachClick', () => {
    it('should navigate to user-profile with coach data', () => {
      const coach = mockCoaches[0];
      component.onCoachClick(coach);
      expect(router.navigate).toHaveBeenCalledWith(['/user-profile'], { state: { coach } });
    });
  });

  describe('retryLoad', () => {
    it('should call loadCoaches', () => {
      spyOn(component, 'loadCoaches');
      component.retryLoad();
      expect(component.loadCoaches).toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    beforeEach(() => {
      coachService.getCoaches.and.returnValue(of(mockCoaches));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should display loading state', () => {
      component.loading = true;
      component.error = '';
      component.coaches = [];
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const loadingElement = compiled.querySelector('div[style*="text-align: center; padding: 40px;"]');
      expect(loadingElement).toBeTruthy();
      expect(compiled.textContent).toContain('Loading coaches...');
    });

    it('should display error state', () => {
      component.loading = false;
      component.error = 'Failed to load coaches';
      component.coaches = [];
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const errorElement = compiled.querySelector('div[style*="text-align: center; padding: 40px;"]');
      expect(errorElement).toBeTruthy();
      expect(compiled.textContent).toContain('Failed to load coaches');
    });

    it('should display coaches table when data is loaded', () => {
      component.loading = false;
      component.error = '';
      component.coaches = mockCoaches;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const tableElement = compiled.querySelector('table');
      expect(tableElement).toBeTruthy();
    });

    it('should display coach information in table', () => {
      component.loading = false;
      component.error = '';
      component.coaches = mockCoaches;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const coachName = compiled.querySelector('td[style*="font-weight: 500"]');
      expect(coachName?.textContent).toContain('Rose');
    });

    it('should display no coaches message when array is empty', () => {
      component.loading = false;
      component.error = '';
      component.coaches = [];
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const noCoachesElement = compiled.querySelector('div[style*="text-align: center; padding: 40px;"]');
      expect(noCoachesElement).toBeTruthy();
      expect(compiled.textContent).toContain('No coaches available at the moment.');
    });
  });

  describe('Navigation Links', () => {
    it('should have navigation links in header', () => {
      const compiled = fixture.nativeElement;
      const links = compiled.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should have logout link', () => {
      const compiled = fixture.nativeElement;
      const logoutLink = compiled.querySelector('a[href="/"]');
      expect(logoutLink?.textContent).toContain('Logout');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty coaches array', () => {
      coachService.getCoaches.and.returnValue(of([]));
      component.loadCoaches();
      fixture.detectChanges();
      
      expect(component.coaches).toEqual([]);
      expect(component.loading).toBe(false);
    });

    it('should handle null coach data gracefully', () => {
      coachService.getCoaches.and.returnValue(of(null as any));
      component.loadCoaches();
      fixture.detectChanges();
      // Should handle null gracefully by setting to empty array
      expect(component.coaches).toEqual([]);
    });
  });
});
