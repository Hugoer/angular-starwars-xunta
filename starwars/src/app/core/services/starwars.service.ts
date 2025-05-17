import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Character, Film, Person } from '../models/swapi.model';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

private baseUrl = 'https://www.swapi.tech/api/';

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<any>(`${this.baseUrl}films`).pipe(
      map((response) => response.results)
    );
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<any>(`${this.baseUrl}films/${id}`).pipe(
      map((response) => response.result)
    );
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<any>(`${this.baseUrl}people`).pipe(
      map((response) => response.results)
    );
  }

  getCharacterById(id: number): Observable<Person> {
    return this.http.get<any>(`${this.baseUrl}people/${id}`).pipe(
      map((response) => response.result.properties)
    );
  }

}
