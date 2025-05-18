import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CharacterListComponent } from './character-list.component';
import { StarwarsService } from '../../core/services/starwars.service';
import { LoggerService } from '../../core/services/logger.service';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let starwarsSpy: jasmine.SpyObj<StarwarsService>;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(async () => {
    starwarsSpy = jasmine.createSpyObj('StarwarsService', ['getCharacters']);
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    await TestBed.configureTestingModule({
      imports: [CharacterListComponent],
      providers: [
        { provide: StarwarsService, useValue: starwarsSpy },
        { provide: LoggerService, useValue: loggerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    starwarsSpy.getCharacters.and.returnValue(of([{ uid: '1', name: 'Leia Organa' }]));
    fixture.detectChanges();
  });

  it('should create component and fetch characters', () => {
    expect(component).toBeTruthy();
    expect(starwarsSpy.getCharacters).toHaveBeenCalled();
  });
});
