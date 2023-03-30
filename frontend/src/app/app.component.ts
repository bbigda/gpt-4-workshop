import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Person} from "./models/person";
import {PersonService} from "./services/person.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  persons: Person[] = [];
  personForm: FormGroup;

  constructor(private personService: PersonService) {
    this.personForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.personService.getAllPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const newPerson: Person = this.personForm.value;
      this.personService.savePerson(newPerson).subscribe((data) => {
        this.persons.push(data);
        this.personForm.reset();
      });
    }
  }
}
