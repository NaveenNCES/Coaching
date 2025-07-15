import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [ScheduleComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.scheduleForm.get('date')?.value).toBe('');
    expect(component.scheduleForm.get('slot')?.value).toBe('');
  });

  it('should have required validators on form controls', () => {
    const dateControl = component.scheduleForm.get('date');
    const slotControl = component.scheduleForm.get('slot');
    
    expect(dateControl?.hasError('required')).toBe(true);
    expect(slotControl?.hasError('required')).toBe(true);
  });

  describe('Form Validation', () => {
    it('should be invalid when both fields are empty', () => {
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should be invalid when only date is filled', () => {
      component.scheduleForm.patchValue({ date: '2024-01-15' });
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should be invalid when only slot is filled', () => {
      component.scheduleForm.patchValue({ slot: '9 AM to 10 AM' });
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should be valid when both fields are filled', () => {
      component.scheduleForm.patchValue({
        date: '2024-01-15',
        slot: '9 AM to 10 AM'
      });
      expect(component.scheduleForm.valid).toBe(true);
    });
  });

  describe('Available Slots', () => {
    it('should have predefined time slots', () => {
      expect(component.slots).toContain('9 AM to 10 AM');
      expect(component.slots).toContain('10 AM to 11 AM');
      expect(component.slots).toContain('11 AM to 12 PM');
      expect(component.slots).toContain('2 PM to 3 PM');
      expect(component.slots).toContain('3 PM to 4 PM');
      expect(component.slots).toContain('4 PM to 5 PM');
    });

    it('should have exactly 6 time slots', () => {
      expect(component.slots.length).toBe(6);
    });
  });

  describe('onSubmit', () => {
    it('should show alert when form is valid', () => {
      spyOn(window, 'alert');
      component.scheduleForm.patchValue({
        date: '2024-01-15',
        slot: '9 AM to 10 AM'
      });
      
      component.onSubmit();
      
      expect(window.alert).toHaveBeenCalledWith('Appointment confirmed!');
    });

    it('should mark form as touched when form is invalid', () => {
      spyOn(component.scheduleForm, 'markAllAsTouched');
      
      component.onSubmit();
      
      expect(component.scheduleForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not show alert when form is invalid', () => {
      spyOn(window, 'alert');
      
      component.onSubmit();
      
      expect(window.alert).not.toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    it('should have form element', () => {
      const compiled = fixture.nativeElement;
      const formElement = compiled.querySelector('form');
      expect(formElement).toBeTruthy();
    });

    it('should have date input field', () => {
      const compiled = fixture.nativeElement;
      const dateInput = compiled.querySelector('input[formControlName="date"]');
      expect(dateInput).toBeTruthy();
    });

    it('should have slot radio buttons', () => {
      const compiled = fixture.nativeElement;
      const slotRadios = compiled.querySelectorAll('input[type="radio"][formControlName="slot"]');
      expect(slotRadios.length).toBe(component.slots.length);
    });

    it('should have submit button', () => {
      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });

    it('should display all available slots as radio options', () => {
      const compiled = fixture.nativeElement;
      const radioButtons = compiled.querySelectorAll('input[type="radio"][formControlName="slot"]');
      expect(radioButtons.length).toBe(component.slots.length);
    });


  });

  describe('Form Interaction', () => {
    it('should update form value when date is selected', () => {
      const compiled = fixture.nativeElement;
      const dateInput = compiled.querySelector('input[formControlName="date"]');
      
      dateInput.value = '2024-01-15';
      dateInput.dispatchEvent(new Event('input'));
      
      expect(component.scheduleForm.get('date')?.value).toBe('2024-01-15');
    });

    it('should update form value when slot is selected', () => {
      const compiled = fixture.nativeElement;
      const slotRadio = compiled.querySelector('input[type="radio"][formControlName="slot"]');
      
      if (slotRadio) {
        slotRadio.checked = true;
        slotRadio.dispatchEvent(new Event('change'));
        
        expect(component.scheduleForm.get('slot')?.value).toBe('9 AM to 10 AM');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty date value', () => {
      component.scheduleForm.patchValue({ date: '', slot: '9 AM to 10 AM' });
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should handle empty slot value', () => {
      component.scheduleForm.patchValue({ date: '2024-01-15', slot: '' });
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should handle null values', () => {
      component.scheduleForm.patchValue({ date: null, slot: null });
      expect(component.scheduleForm.valid).toBe(false);
    });

    it('should handle invalid date format', () => {
      component.scheduleForm.patchValue({ date: 'invalid-date', slot: '9 AM to 10 AM' });
      expect(component.scheduleForm.valid).toBe(true); // HTML5 validation handles this
    });
  });

  describe('Form Reset', () => {
    it('should reset form to initial state', () => {
      component.scheduleForm.patchValue({
        date: '2024-01-15',
        slot: '9 AM to 10 AM'
      });
      
      component.scheduleForm.reset();
      
      expect(component.scheduleForm.get('date')?.value).toBe(null);
      expect(component.scheduleForm.get('slot')?.value).toBe(null);
    });
  });
});
