import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', ['addLangs', 'setDefaultLang', 'getBrowserLang', 'use']);
    // Default: simulate browser language as 'en'
    translateService.getBrowserLang.and.returnValue('en');
    TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [{ provide: TranslateService, useValue: translateService }]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize translation with browser language if supported', () => {
    translateService.getBrowserLang.and.returnValue('en');
    TestBed.createComponent(AppComponent);  // triggers constructor logic
    expect(translateService.addLangs).toHaveBeenCalledWith(['gl', 'en']);
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('gl');
    // Since 'en' is supported, it should use browser language
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should default to "gl" if browser language not supported', () => {
    translateService.getBrowserLang.and.returnValue('es');  // unsupported language
    TestBed.createComponent(AppComponent);
    expect(translateService.addLangs).toHaveBeenCalledWith(['gl', 'en']);
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('gl');
    // Should fall back to Galician ('gl')
    expect(translateService.use).toHaveBeenCalledWith('gl');
  });
});
