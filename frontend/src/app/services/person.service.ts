// src/app/services/person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private baseUrl = `${environment.backendBaseUrl}/persons`;

  constructor(private http: HttpClient) {}

  public getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  public savePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person);
  }
}
