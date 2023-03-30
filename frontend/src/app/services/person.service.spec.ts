import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PersonService} from "./person.service";
import {Person} from "../models/person";
import {environment} from "../../environments/environment";

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService],
    });

    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch persons', () => {
    const dummyPersons: Person[] = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ];

    service.getAllPersons().subscribe((persons) => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(dummyPersons);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}/persons`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPersons);
  });

  it('should save a new person', () => {
    const newPerson: Person = { firstName: 'Jack', lastName: 'Smith' };

    service.savePerson(newPerson).subscribe((person) => {
      expect(person).toEqual(newPerson);
    });

    const req = httpMock.expectOne(`${environment.backendBaseUrl}/persons`);
    expect(req.request.method).toBe('POST');
    req.flush(newPerson);
  });
});
