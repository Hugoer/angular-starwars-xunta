import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterMenuComponent } from './character-menu.component';

describe('CharacterMenuComponent', () => {
  let fixture: ComponentFixture<CharacterMenuComponent>;
  let component: CharacterMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterMenuComponent,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu links with correct routes', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const links = compiled.querySelectorAll('a[routerLink]');
    expect(links.length).toBe(3);
    expect(links[0].getAttribute('routerLink')).toBe('/character/list');
    expect(links[1].getAttribute('routerLink')).toBe('/character/filter');
    expect(links[2].getAttribute('routerLink')).toBe('/character/add');
  });
});
