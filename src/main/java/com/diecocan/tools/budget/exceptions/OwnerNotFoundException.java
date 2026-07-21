package com.diecocan.tools.budget.exceptions;

public class OwnerNotFoundException extends RuntimeException{

    public OwnerNotFoundException(Long id) {
            super("Could not find owner: " + id);
    }
}
