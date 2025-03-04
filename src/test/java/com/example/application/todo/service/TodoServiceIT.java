package com.example.application.todo.service;

import com.example.application.todo.domain.Todo;
import com.example.application.todo.domain.TodoRepository;
import jakarta.validation.ValidationException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@Transactional(propagation = Propagation.NOT_SUPPORTED)
class TodoServiceIT {

    @Autowired
    TodoService todoService;

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    Clock clock;

    @AfterEach
    void cleanUp() {
        todoRepository.deleteAll();
    }

    @Test
    public void todos_are_stored_in_the_database_with_the_current_timestamp() {
        var now = clock.instant();
        var due = LocalDate.of(2025, 2, 7);
        todoService.createTodo("Do this", due);
        assertThat(todoService.list(PageRequest.ofSize(1))).singleElement()
                .matches(todo -> todo.getDescription().equals("Do this") && due.equals(todo.getDueDate())
                        && todo.getCreationDate().isAfter(now));
    }

    @Test
    public void todos_are_validated_before_they_are_stored() {
        assertThatThrownBy(() -> todoService.createTodo("X".repeat(Todo.DESCRIPTION_MAX_LENGTH + 1), null))
                .isInstanceOf(ValidationException.class);
        assertThat(todoRepository.count()).isEqualTo(0);
    }
}
