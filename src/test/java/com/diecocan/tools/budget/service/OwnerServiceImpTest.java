package com.diecocan.tools.budget.service;

import com.diecocan.tools.budget.model.Owner;
import com.diecocan.tools.budget.repository.OwnerRepository;
import com.diecocan.tools.budget.service.impl.OwnerServiceImp;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OwnerServiceImpTest {
    @Mock OwnerRepository repository;
    @InjectMocks OwnerServiceImp service;

    @Test
    void findAll_returnsAllOwnersFromRepository() {
        List<Owner> expected = List.of(new Owner("Alice", true), new Owner("Bob", false));
        when(repository.findAll()).thenReturn(expected);

        List<Owner> actual = service.findAll();

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void findById_present_returnsOwner() {
        Owner owner = new Owner("Alice", true);
        owner.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(owner));

        Optional<Owner> actual = service.findById(1L);

        assertThat(actual).contains(owner);
    }

    @Test
    void findById_absent_returnsEmptyOptional() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        Optional<Owner> actual = service.findById(99L);

        assertThat(actual).isEmpty();
    }

    @Test
    void save_delegatesToRepositoryAndReturnsResult() {
        Owner toSave = new Owner("Alice", true);
        Owner saved = new Owner("Alice", true);
        saved.setId(1L);
        when(repository.save(toSave)).thenReturn(saved);

        Owner actual = service.save(toSave);

        assertThat(actual).isEqualTo(saved);
        verify(repository).save(toSave);
    }

    @Test
    void deleteById_delegatesToRepository() {
        service.deleteById(1L);

        verify(repository).deleteById(1L);
    }
}
