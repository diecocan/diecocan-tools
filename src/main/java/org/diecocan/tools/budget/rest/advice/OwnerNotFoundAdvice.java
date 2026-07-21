package org.diecocan.tools.budget.rest.advice;

import org.diecocan.tools.budget.exceptions.OwnerNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class OwnerNotFoundAdvice {

    @ExceptionHandler(OwnerNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String ownerNotFoundHandler(OwnerNotFoundException e) {
        return e.getMessage();
    }
}
