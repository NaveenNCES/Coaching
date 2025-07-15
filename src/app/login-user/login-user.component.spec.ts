import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserComponent } from './login-user.component';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [LoginUserComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form values', () => {
    expect(component.loginForm.get('id')?.value).toBe('UI-001');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.loginError).toBe('');
  });

  it('should have id field disabled', () => {
    const idControl = component.loginForm.get('id');
    expect(idControl?.disabled).toBe(true);
  });

  describe('Form Validation', () => {
    it('should be invalid when password is empty', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when password is too short', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when password is too long', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123456789012345');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when password lacks special character', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('user123');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when password lacks number', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('user@abc');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when password lacks letter', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123@456');
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be valid with correct password format', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('user@123');
      expect(component.loginForm.valid).toBe(true);
    });
  });

  describe('Authentication', () => {
    it('should navigate to user-home when correct password is provided', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('user@123');
      
      component.onSubmit();
      
      expect(router.navigate).toHaveBeenCalledWith(['/user-home']);
      expect(component.loginError).toBe('');
    });

    it('should show error message when incorrect password is provided', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('wrong@123');
      
      component.onSubmit();
      
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.loginError).toBe('Invalid password. Please try again.');
    });

    it('should mark form as touched when submitted with invalid data', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('short');
      
      component.onSubmit();
      
      expect(component.loginForm.touched).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    it('should display user ID in the form', () => {
      const compiled = fixture.nativeElement;
      const idInput = compiled.querySelector('input[formControlName="id"]');
      expect(idInput.value).toBe('UI-001');
    });

    it('should display error message when login fails', () => {
      component.loginError = 'Invalid password. Please try again.';
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const errorElement = compiled.querySelector('div[style*="color: #d32f2f"]');
      expect(errorElement?.textContent).toContain('Invalid password. Please try again.');
    });

    it('should have submit button', () => {
      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty password submission', () => {
      component.onSubmit();
      expect(component.loginForm.touched).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should handle null password value', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue(null);
      
      component.onSubmit();
      
      expect(component.loginForm.touched).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
