package com.diecocan.tools.budget.repository;

import com.diecocan.tools.budget.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
