import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFilterlistComponent } from './character-filterlist.component';

describe('CharacterFilterlistComponent', () => {
  let component: CharacterFilterlistComponent;
  let fixture: ComponentFixture<CharacterFilterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFilterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFilterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
