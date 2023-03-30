package com.example.myspringbackend;

import com.example.myspringbackend.model.Person;
import com.example.myspringbackend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyRestController {

    @Autowired
    private PersonService personService;

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/api/persons")
    public List<Person> getAllPersons() {
        return personService.findAll();
    }

    @PostMapping("/api/persons")
    public Person savePerson(@RequestBody Person person) {
        return personService.save(person);
    }
}
