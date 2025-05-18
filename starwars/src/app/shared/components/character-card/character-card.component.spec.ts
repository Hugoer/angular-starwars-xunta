import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';

describe('CharacterCardComponent', () => {
  let fixture: ComponentFixture<CharacterCardComponent>;
  let component: CharacterCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the character name in an h2', () => {
    const testName = 'Luke Skywalker';
    component.name = testName;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const nameHeading = compiled.querySelector('h2');
    expect(nameHeading?.textContent).toContain(testName);
  });

  it('should apply highlight and scale directives to the card element', () => {
    component.name = 'Test Name';
    fixture.detectChanges();
    const cardDiv: HTMLElement = fixture.nativeElement.querySelector('div.card');
    expect(cardDiv).toBeTruthy();
    // The element should have the directive attributes
    expect(cardDiv.hasAttribute('appHighlight')).toBeTrue();
    expect(cardDiv.hasAttribute('appScaleOnHover')).toBeTrue();
  });
});
