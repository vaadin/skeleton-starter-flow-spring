package org.vaadin.example;



import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface SamplePersonRepository extends JpaRepository<SamplePerson, Integer> {

}