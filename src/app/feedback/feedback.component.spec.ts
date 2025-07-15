import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.feedbackForm.get('name')?.value).toBe('');
    expect(component.feedbackForm.get('email')?.value).toBe('');
    expect(component.feedbackForm.get('countryCode')?.value).toBe('');
    expect(component.feedbackForm.get('phone')?.value).toBe('');
    expect(component.feedbackForm.get('category')?.value).toBe('');
    expect(component.feedbackForm.get('experience')?.value).toBe('');
    expect(component.feedbackForm.get('feedback')?.value).toBe('');
  });

  describe('Form Validation', () => {
    it('should be invalid when all fields are empty', () => {
      expect(component.feedbackForm.valid).toBe(false);
    });

    it('should be valid when all fields are filled correctly', () => {
      component.feedbackForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        countryCode: '+1',
        phone: '1234567890',
        category: 'Confidence Issues',
        experience: 'Good',
        feedback: 'Great experience with the coach'
      });
      expect(component.feedbackForm.valid).toBe(true);
    });

    describe('Name Field', () => {
      it('should be invalid when name is empty', () => {
        const nameControl = component.feedbackForm.get('name');
        nameControl?.setValue('');
        expect(nameControl?.hasError('required')).toBe(true);
      });

      it('should be invalid when name is too short', () => {
        const nameControl = component.feedbackForm.get('name');
        nameControl?.setValue('Jo');
        expect(nameControl?.hasError('minlength')).toBe(true);
      });

      it('should be invalid when name is too long', () => {
        const nameControl = component.feedbackForm.get('name');
        nameControl?.setValue('A'.repeat(51));
        expect(nameControl?.hasError('maxlength')).toBe(true);
      });

      it('should be valid when name is correct length', () => {
        const nameControl = component.feedbackForm.get('name');
        nameControl?.setValue('John Doe');
        expect(nameControl?.valid).toBe(true);
      });
    });

    describe('Email Field', () => {
      it('should be invalid when email is empty', () => {
        const emailControl = component.feedbackForm.get('email');
        emailControl?.setValue('');
        expect(emailControl?.hasError('required')).toBe(true);
      });

      it('should be invalid when email format is incorrect', () => {
        const emailControl = component.feedbackForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.hasError('email')).toBe(true);
      });

      it('should be valid when email format is correct', () => {
        const emailControl = component.feedbackForm.get('email');
        emailControl?.setValue('john@example.com');
        expect(emailControl?.valid).toBe(true);
      });
    });

    describe('Phone Field', () => {
      it('should be invalid when phone is empty', () => {
        const phoneControl = component.feedbackForm.get('phone');
        phoneControl?.setValue('');
        expect(phoneControl?.hasError('required')).toBe(true);
      });

      it('should be invalid when phone is not 10 digits', () => {
        const phoneControl = component.feedbackForm.get('phone');
        phoneControl?.setValue('123456789');
        expect(phoneControl?.hasError('pattern')).toBe(true);
      });

      it('should be valid when phone is 10 digits', () => {
        const phoneControl = component.feedbackForm.get('phone');
        phoneControl?.setValue('1234567890');
        expect(phoneControl?.valid).toBe(true);
      });
    });

    describe('Category Field', () => {
      it('should be invalid when category is empty', () => {
        const categoryControl = component.feedbackForm.get('category');
        categoryControl?.setValue('');
        expect(categoryControl?.hasError('required')).toBe(true);
      });

      it('should be valid when category is selected', () => {
        const categoryControl = component.feedbackForm.get('category');
        categoryControl?.setValue('Confidence Issues');
        expect(categoryControl?.valid).toBe(true);
      });
    });

    describe('Experience Field', () => {
      it('should be invalid when experience is empty', () => {
        const experienceControl = component.feedbackForm.get('experience');
        experienceControl?.setValue('');
        expect(experienceControl?.hasError('required')).toBe(true);
      });

      it('should be valid when experience is selected', () => {
        const experienceControl = component.feedbackForm.get('experience');
        experienceControl?.setValue('Good');
        expect(experienceControl?.valid).toBe(true);
      });
    });

    describe('Feedback Field', () => {
      it('should be invalid when feedback is empty', () => {
        const feedbackControl = component.feedbackForm.get('feedback');
        feedbackControl?.setValue('');
        expect(feedbackControl?.hasError('required')).toBe(true);
      });

      it('should be invalid when feedback is too long', () => {
        const feedbackControl = component.feedbackForm.get('feedback');
        feedbackControl?.setValue('A'.repeat(51));
        expect(feedbackControl?.hasError('maxlength')).toBe(true);
      });

      it('should be valid when feedback is correct length', () => {
        const feedbackControl = component.feedbackForm.get('feedback');
        feedbackControl?.setValue('Great experience with the coach');
        expect(feedbackControl?.valid).toBe(true);
      });
    });
  });

  describe('Available Options', () => {
    it('should have predefined country codes', () => {
      expect(component.countryCodes).toContain('+91');
      expect(component.countryCodes).toContain('+1');
      expect(component.countryCodes).toContain('+44');
      expect(component.countryCodes).toContain('+61');
      expect(component.countryCodes).toContain('+852');
    });

    it('should have predefined categories', () => {
      expect(component.categories).toContain('Confidence Issues');
      expect(component.categories).toContain('Depression Issues');
      expect(component.categories).toContain('Overweight Issues');
      expect(component.categories).toContain('Hypertension Issues');
    });

    it('should have predefined experiences', () => {
      expect(component.experiences).toContain('Poor');
      expect(component.experiences).toContain('Average');
      expect(component.experiences).toContain('Good');
      expect(component.experiences).toContain('Very Good');
    });
  });

  describe('onSubmit', () => {
    it('should navigate to feedback-success when form is valid', () => {
      component.feedbackForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        countryCode: '+1',
        phone: '1234567890',
        category: 'Confidence Issues',
        experience: 'Good',
        feedback: 'Great experience with the coach'
      });
      
      component.onSubmit();
      
      expect(router.navigate).toHaveBeenCalledWith(['/feedback-success']);
    });

    it('should mark form as touched when form is invalid', () => {
      spyOn(component.feedbackForm, 'markAllAsTouched');
      
      component.onSubmit();
      
      expect(component.feedbackForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not navigate when form is invalid', () => {
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    it('should have form element', () => {
      const compiled = fixture.nativeElement;
      const formElement = compiled.querySelector('form');
      expect(formElement).toBeTruthy();
    });

    it('should have all required form fields', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('input[formControlName="name"]')).toBeTruthy();
      expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
      expect(compiled.querySelector('select[formControlName="countryCode"]')).toBeTruthy();
      expect(compiled.querySelector('input[formControlName="phone"]')).toBeTruthy();
      expect(compiled.querySelector('input[formControlName="category"]')).toBeTruthy();
      expect(compiled.querySelector('input[type="radio"][formControlName="experience"]')).toBeTruthy();
      expect(compiled.querySelector('textarea[formControlName="feedback"]')).toBeTruthy();
    });

    it('should have submit button', () => {
      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });

    it('should display all country code options', () => {
      const compiled = fixture.nativeElement;
      const countryCodeOptions = compiled.querySelectorAll('select[formControlName="countryCode"] option');
      expect(countryCodeOptions.length).toBe(component.countryCodes.length + 1); // +1 for default option
    });

    it('should display all category options', () => {
      const compiled = fixture.nativeElement;
      const categoryOptions = compiled.querySelectorAll('datalist#categories option');
      expect(categoryOptions.length).toBe(component.categories.length);
    });

    it('should display all experience options', () => {
      const compiled = fixture.nativeElement;
      const experienceOptions = compiled.querySelectorAll('input[type="radio"][formControlName="experience"]');
      expect(experienceOptions.length).toBe(component.experiences.length);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values in form', () => {
      component.feedbackForm.patchValue({
        name: null,
        email: null,
        countryCode: null,
        phone: null,
        category: null,
        experience: null,
        feedback: null
      });
      expect(component.feedbackForm.valid).toBe(false);
    });

    it('should handle empty string values', () => {
      component.feedbackForm.patchValue({
        name: '',
        email: '',
        countryCode: '',
        phone: '',
        category: '',
        experience: '',
        feedback: ''
      });
      expect(component.feedbackForm.valid).toBe(false);
    });

    it('should handle whitespace-only values', () => {
      component.feedbackForm.patchValue({
        name: '   ',
        email: '   ',
        phone: '   ',
        feedback: '   '
      });
      expect(component.feedbackForm.valid).toBe(false);
    });
  });
});
