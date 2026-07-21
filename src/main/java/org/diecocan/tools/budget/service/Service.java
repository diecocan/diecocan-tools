package org.diecocan.tools.budget.service;

import java.util.List;
import java.util.Optional;

public interface Service<T> {
    List<T> findAll();
    Optional<T> findById(Long id);
    T save(T newType);
    void deleteById(Long id);
}
