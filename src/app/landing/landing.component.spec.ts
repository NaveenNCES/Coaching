import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header Section', () => {
    it('should display WeCare logo', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo).toBeTruthy();
    });

    it('should display WeCare title', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('span');
      expect(title?.textContent).toContain('WeCare');
    });

    it('should have contact us link', () => {
      const compiled = fixture.nativeElement;
      const contactLink = compiled.querySelector('a[href="/contact-us"]');
      expect(contactLink).toBeTruthy();
      expect(contactLink?.textContent).toContain('Contact Us');
    });

    it('should have proper header styling', () => {
      const compiled = fixture.nativeElement;
      const header = compiled.querySelector('div[style*="display: flex; justify-content: space-between"]');
      expect(header).toBeTruthy();
    });
  });

  describe('Main Content', () => {
    it('should display main heading', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h2');
      expect(heading?.textContent).toContain('We are at the heart of appropriate care');
    });

    it('should display home image', () => {
      const compiled = fixture.nativeElement;
      const image = compiled.querySelector('img[src="assets/home.jpg"]');
      expect(image).toBeTruthy();
    });

    it('should display description text', () => {
      const compiled = fixture.nativeElement;
      const description = compiled.querySelector('p');
      expect(description?.textContent).toContain('WeCare is an online life coaching application');
    });

    it('should have login button', () => {
      const compiled = fixture.nativeElement;
      const loginButton = compiled.querySelector('button');
      expect(loginButton).toBeTruthy();
      expect(loginButton?.textContent).toContain('Login');
    });
  });

  describe('Navigation', () => {
    it('should have router link on login button', () => {
      const compiled = fixture.nativeElement;
      const loginButton = compiled.querySelector('button');
      expect(loginButton?.getAttribute('ng-reflect-router-link')).toBe('/login-user-form');
    });

    it('should have router link on contact us link', () => {
      const compiled = fixture.nativeElement;
      const contactLink = compiled.querySelector('a[href="/contact-us"]');
      expect(contactLink?.getAttribute('href')).toBe('/contact-us');
    });
  });

  describe('Footer', () => {
    it('should display copyright text', () => {
      const compiled = fixture.nativeElement;
      const copyright = compiled.querySelector('div[style*="text-align: center; margin-top: 32px; color: #888; font-size: 0.95rem"]');
      expect(copyright?.textContent).toContain('Copyright©2022 WeCare. All rights reserved.');
    });
  });

  describe('Layout and Styling', () => {
    it('should have proper container structure', () => {
      const compiled = fixture.nativeElement;
      const mainContainer = compiled.querySelector('div[style*="display: flex; justify-content: center"]');
      expect(mainContainer).toBeTruthy();
    });

    it('should have header with proper styling', () => {
      const compiled = fixture.nativeElement;
      const header = compiled.querySelector('div[style*="display: flex; justify-content: space-between"]');
      expect(header).toBeTruthy();
    });

    it('should have main content area with proper styling', () => {
      const compiled = fixture.nativeElement;
      const contentArea = compiled.querySelector('div[style*="border: 1px solid #ccc"]');
      expect(contentArea).toBeTruthy();
    });
  });

  describe('Image Handling', () => {
    it('should have onerror handler for logo', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('onerror')).toBe('this.style.display=\'none\'');
    });

    it('should have proper image styling', () => {
      const compiled = fixture.nativeElement;
      const homeImage = compiled.querySelector('img[src="assets/home.jpg"]');
      expect(homeImage?.getAttribute('style')).toContain('max-width: 400px');
    });
  });

  describe('Button Styling', () => {
    it('should have login button with proper styling', () => {
      const compiled = fixture.nativeElement;
      const loginButton = compiled.querySelector('button');
      expect(loginButton?.getAttribute('style')).toContain('background: #5a3e85');
      expect(loginButton?.getAttribute('style')).toContain('color: #fff');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive image styling', () => {
      const compiled = fixture.nativeElement;
      const homeImage = compiled.querySelector('img[src="assets/home.jpg"]');
      expect(homeImage?.getAttribute('style')).toContain('width: 100%');
      expect(homeImage?.getAttribute('style')).toContain('height: auto');
    });

    it('should have responsive container styling', () => {
      const compiled = fixture.nativeElement;
      const contentArea = compiled.querySelector('div[style*="width: 700px"]');
      expect(contentArea).toBeTruthy();
    });
  });

  describe('Content Verification', () => {
    it('should contain all required text content', () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      
      expect(content).toContain('WeCare');
      expect(content).toContain('We are at the heart of appropriate care');
      expect(content).toContain('online life coaching application');
      expect(content).toContain('Login');
      expect(content).toContain('Contact Us');
      expect(content).toContain('Copyright©2022 WeCare');
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for images', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      const homeImage = compiled.querySelector('img[src="assets/home.jpg"]');
      
      expect(logo?.getAttribute('alt')).toBe('WeCare Logo');
      expect(homeImage?.getAttribute('alt')).toBe('Heart and Icons');
    });

    it('should have proper link text', () => {
      const compiled = fixture.nativeElement;
      const contactLink = compiled.querySelector('a[href="/contact-us"]');
      expect(contactLink?.textContent?.trim()).toBe('Contact Us');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing logo gracefully', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('onerror')).toBe('this.style.display=\'none\'');
    });

    it('should maintain layout without images', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('span');
      expect(title?.textContent).toContain('WeCare');
    });
  });
});
