package com.example.myspringbackend.service;

import com.example.myspringbackend.model.Person;
import com.example.myspringbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Cacheable(value = "persons")
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    @CacheEvict(value = "persons", allEntries = true)
    public Person save(Person person) {
        return personRepository.save(person);
    }
}
