import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PersonService } from './services/person.service';
import { Person } from './models/person';
import { of } from 'rxjs';

class MockPersonService {
  getAllPersons() {
    return of([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ]);
  }

  savePerson(person: Person) {
    return of(person);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let personService: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [{ provide: PersonService, useClass: MockPersonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    personService = TestBed.inject(PersonService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch persons on ngOnInit', () => {
    // noinspection TypeScriptValidateTypes
    spyOn(personService, 'getAllPersons').and.callThrough();
    component.ngOnInit();
    expect(personService.getAllPersons).toHaveBeenCalled();
    expect(component.persons.length).toBe(2);
  });

  it('should submit a new person and update persons list', fakeAsync(() => {
    const newPerson: Person = { firstName: 'Jack', lastName: 'Smith' };
    const expectedPersonsLength = component.persons.length + 1;

    // noinspection TypeScriptValidateTypes
    spyOn(personService, 'savePerson').and.returnValue(of(newPerson));

    component.personForm.setValue(newPerson);
    component.onSubmit();

    tick();

    expect(personService.savePerson).toHaveBeenCalledWith(newPerson);
    expect(component.persons.length).toBe(expectedPersonsLength);
  }));

});
