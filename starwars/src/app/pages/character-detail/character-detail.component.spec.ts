import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CharacterDetailComponent } from './character-detail.component';
import { LoggerService } from '../../core/services/logger.service';
import { StarwarsService } from '../../core/services/starwars.service';
import { Person } from '../../core/models/swapi.model';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let loggerSpy: jasmine.SpyObj<LoggerService>;
  let starWarsServiceStub: jasmine.SpyObj<StarwarsService>;
  let routeStub: any;

  beforeEach(async () => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    starWarsServiceStub = jasmine.createSpyObj('StarwarsService', ['getCharacterById']);
    // Stub ActivatedRoute with a static 'id' param
    routeStub = { snapshot: { paramMap: { get: (key: string) => '5' } } };
    const dummyPerson: Person = {
      name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue',
      birth_year: '19BBY', gender: 'male', homeworld: 'Tatooine', films: [], species: [], vehicles: [], starships: [],
      created: '', edited: '', url: ''
    };
    starWarsServiceStub.getCharacterById.and.returnValue(of(dummyPerson));

    await TestBed.configureTestingModule({
      imports: [CharacterDetailComponent],
      providers: [
        { provide: LoggerService, useValue: loggerSpy },
        { provide: StarwarsService, useValue: starWarsServiceStub },
        { provide: ActivatedRoute, useValue: routeStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and initialize character data', () => {
    expect(component).toBeTruthy();
    // LoggerService should log initialization message
    expect(loggerSpy.log).toHaveBeenCalledWith('CharacterDetailComponent initialized');
    // Should call service with the route id
    expect(starWarsServiceStub.getCharacterById).toHaveBeenCalledWith(5);

    // character$ should emit the dummy person data
    let receivedPerson: Person | undefined;
    component.character$.subscribe(person => (receivedPerson = person));
    expect(receivedPerson).toEqual(jasmine.objectContaining({ name: 'Luke Skywalker' }));
  });
});
