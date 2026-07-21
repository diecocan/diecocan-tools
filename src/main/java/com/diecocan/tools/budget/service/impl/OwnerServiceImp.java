package com.diecocan.tools.budget.service.impl;

import com.diecocan.tools.budget.model.Owner;
import com.diecocan.tools.budget.repository.OwnerRepository;
import com.diecocan.tools.budget.service.Service;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class OwnerServiceImp implements Service<Owner> {
    private final OwnerRepository repository;

    public OwnerServiceImp(OwnerRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Owner> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Owner> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Owner save(Owner newType) {
        return repository.save(newType);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
