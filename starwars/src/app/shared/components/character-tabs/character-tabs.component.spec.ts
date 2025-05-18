import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterTabsComponent } from './character-tabs.component';

describe('CharacterTabsComponent', () => {
  let fixture: ComponentFixture<CharacterTabsComponent>;
  let component: CharacterTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterTabsComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CharacterTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render default message', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph?.textContent).toContain('character-tabs works!');
  });
});
