import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StarwarsService } from './starwars.service';
import { Character, Film, Person } from '../models/swapi.model';

describe('StarwarsService', () => {
  let service: StarwarsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StarwarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch films list', () => {
    const dummyFilms: Film[] = [
      { title: 'A New Hope', episode_id: 4, opening_crawl: '', director: '', producer: '', release_date: '', characters: [], planets: [], starships: [], vehicles: [], species: [], created: '', edited: '', url: '' } as Film
    ];
    service.getFilms().subscribe(films => {
      expect(films).toEqual(dummyFilms);
    });
    const req = httpMock.expectOne('https://www.swapi.tech/api/films');
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyFilms });
  });

  it('should fetch a single film by id', () => {
    const dummyFilm: Film = { title: 'The Empire Strikes Back', episode_id: 5, opening_crawl: '', director: '', producer: '', release_date: '', characters: [], planets: [], starships: [], vehicles: [], species: [], created: '', edited: '', url: '' } as Film;
    service.getFilmById(5).subscribe(film => {
      expect(film).toEqual(dummyFilm);
    });
    const req = httpMock.expectOne('https://www.swapi.tech/api/films/5');
    expect(req.request.method).toBe('GET');
    req.flush({ result: dummyFilm });
  });

  it('should fetch characters list', () => {
    const dummyCharacters: Character[] = [
      { uid: '1', name: 'Luke Skywalker' },
      { uid: '2', name: 'Darth Vader' }
    ];
    service.getCharacters().subscribe(chars => {
      expect(chars).toEqual(dummyCharacters);
    });
    const req = httpMock.expectOne('https://www.swapi.tech/api/people');
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyCharacters });
  });

  it('should fetch character details by id', () => {
    const dummyPerson: Person = { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 'Tatooine', films: [], species: [], vehicles: [], starships: [], created: '', edited: '', url: '' };
    service.getCharacterById(1).subscribe(person => {
      expect(person).toEqual(dummyPerson);
    });
    const req = httpMock.expectOne('https://www.swapi.tech/api/people/1');
    expect(req.request.method).toBe('GET');
    req.flush({ result: { properties: dummyPerson } });
  });

  it('should search characters by name', () => {
    const dummyResults = [
      { uid: '1', properties: { name: 'R2-D2' } },
      { uid: '2', properties: { name: 'Luke Skywalker' } }
    ];
    const expectedCharacters: Character[] = [
      { uid: '1', name: 'R2-D2' },
      { uid: '2', name: 'Luke Skywalker' }
    ];
    service.getCharactersByName('Luke').subscribe(chars => {
      expect(chars).toEqual(expectedCharacters);
    });
    const req = httpMock.expectOne('https://www.swapi.tech/api/people?name=Luke');
    expect(req.request.method).toBe('GET');
    req.flush({ result: dummyResults });
  });
});
