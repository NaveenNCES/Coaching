import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
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

    it('should have clickable logo that links to user-home', () => {
      const compiled = fixture.nativeElement;
      const logoLink = compiled.querySelector('a[href="/user-home"]');
      expect(logoLink).toBeTruthy();
    });

    it('should have contact us link in header', () => {
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
    it('should display WeCare title', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('h2');
      expect(title?.textContent).toContain('WeCare');
    });

    it('should display address information', () => {
      const compiled = fixture.nativeElement;
      const address = compiled.querySelector('div[style*="margin-bottom: 8px"]');
      expect(address?.textContent).toContain('MG Road, Pune, Maharashtra 411001');
    });

    it('should display phone number with proper link', () => {
      const compiled = fixture.nativeElement;
      const phoneLink = compiled.querySelector('a[href="tel:+911234123456"]');
      expect(phoneLink).toBeTruthy();
      expect(phoneLink?.textContent).toContain('+91 1234123456');
    });

    it('should display email with proper link', () => {
      const compiled = fixture.nativeElement;
      const emailLink = compiled.querySelector('a[href="mailto:lifestyle@WeCare.com"]');
      expect(emailLink).toBeTruthy();
      expect(emailLink?.textContent).toContain('lifestyle@WeCare.com');
    });

    it('should have "Call Us" label', () => {
      const compiled = fixture.nativeElement;
      const callLabel = compiled.querySelector('b');
      expect(callLabel?.textContent).toContain('Call Us');
    });

    it('should have "Email Us" label', () => {
      const compiled = fixture.nativeElement;
      const emailLabels = compiled.querySelectorAll('b');
      expect(emailLabels[1]?.textContent).toContain('Email Us');
    });
  });

  describe('Map Integration', () => {
    it('should display Google Maps iframe', () => {
      const compiled = fixture.nativeElement;
      const iframe = compiled.querySelector('iframe');
      expect(iframe).toBeTruthy();
    });

    it('should have correct map source URL', () => {
      const compiled = fixture.nativeElement;
      const iframe = compiled.querySelector('iframe');
      expect(iframe?.getAttribute('src')).toContain('google.com/maps');
      expect(iframe?.getAttribute('src')).toContain('MG+Road,+Pune,+Maharashtra+411001');
    });

    it('should have proper iframe attributes', () => {
      const compiled = fixture.nativeElement;
      const iframe = compiled.querySelector('iframe');
      expect(iframe?.getAttribute('width')).toBe('600');
      expect(iframe?.getAttribute('height')).toBe('300');
      expect(iframe?.getAttribute('allowfullscreen')).toBe('');
      expect(iframe?.getAttribute('loading')).toBe('lazy');
    });

    it('should have responsive map styling', () => {
      const compiled = fixture.nativeElement;
      const iframe = compiled.querySelector('iframe');
      expect(iframe?.getAttribute('style')).toContain('max-width: 90vw');
      expect(iframe?.getAttribute('style')).toContain('border-radius: 8px');
    });
  });

  describe('Footer', () => {
    it('should display copyright text', () => {
      const compiled = fixture.nativeElement;
      const copyright = compiled.querySelector('div[style*="position: fixed"]');
      expect(copyright?.textContent).toContain('Copyright©2022 WeCare. All rights reserved.');
    });

    it('should have fixed positioning', () => {
      const compiled = fixture.nativeElement;
      const footer = compiled.querySelector('div[style*="position: fixed"]');
      expect(footer).toBeTruthy();
    });

    it('should have proper footer styling', () => {
      const compiled = fixture.nativeElement;
      const footer = compiled.querySelector('div[style*="position: fixed"]');
      expect(footer?.getAttribute('style')).toContain('bottom: 0');
      expect(footer?.getAttribute('style')).toContain('width: 100%');
      expect(footer?.getAttribute('style')).toContain('text-align: center');
    });
  });

  describe('Layout and Styling', () => {
    it('should have centered content layout', () => {
      const compiled = fixture.nativeElement;
      const contentContainer = compiled.querySelector('div[style*="display: flex; flex-direction: column; align-items: center"]');
      expect(contentContainer).toBeTruthy();
    });

    it('should have proper spacing between elements', () => {
      const compiled = fixture.nativeElement;
      const elements = compiled.querySelectorAll('div[style*="margin-bottom: 8px"]');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should have horizontal rule separator', () => {
      const compiled = fixture.nativeElement;
      const hr = compiled.querySelector('hr');
      expect(hr).toBeTruthy();
    });
  });

  describe('Image Handling', () => {
    it('should have onerror handler for logo', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('onerror')).toBe('this.style.display=\'none\'');
    });

    it('should have proper logo styling', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('style')).toContain('height: 48px');
      expect(logo?.getAttribute('style')).toContain('cursor: pointer');
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for logo', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('alt')).toBe('WeCare Logo');
    });

    it('should have proper link text for phone', () => {
      const compiled = fixture.nativeElement;
      const phoneLink = compiled.querySelector('a[href="tel:+911234123456"]');
      expect(phoneLink?.textContent?.trim()).toBe('+91 1234123456');
    });

    it('should have proper link text for email', () => {
      const compiled = fixture.nativeElement;
      const emailLink = compiled.querySelector('a[href="mailto:lifestyle@WeCare.com"]');
      expect(emailLink?.textContent?.trim()).toBe('lifestyle@WeCare.com');
    });
  });

  describe('Content Verification', () => {
    it('should contain all required contact information', () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      
      expect(content).toContain('WeCare');
      expect(content).toContain('MG Road, Pune, Maharashtra 411001');
      expect(content).toContain('+91 1234123456');
      expect(content).toContain('lifestyle@WeCare.com');
      expect(content).toContain('Call Us');
      expect(content).toContain('Email Us');
      expect(content).toContain('Copyright©2022 WeCare');
    });
  });

  describe('Navigation', () => {
    it('should have navigation back to user-home', () => {
      const compiled = fixture.nativeElement;
      const homeLink = compiled.querySelector('a[href="/user-home"]');
      expect(homeLink).toBeTruthy();
    });

    it('should have current page link', () => {
      const compiled = fixture.nativeElement;
      const contactLink = compiled.querySelector('a[href="/contact-us"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing logo gracefully', () => {
      const compiled = fixture.nativeElement;
      const logo = compiled.querySelector('img[src="assets/wecare-logo.jpg"]');
      expect(logo?.getAttribute('onerror')).toBe('this.style.display=\'none\'');
    });

    it('should maintain layout without map', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('h2');
      expect(title?.textContent).toContain('WeCare');
    });

    it('should have proper z-index for footer', () => {
      const compiled = fixture.nativeElement;
      const footer = compiled.querySelector('div[style*="position: fixed"]');
      expect(footer?.getAttribute('style')).toContain('z-index: 100');
    });
  });
});
