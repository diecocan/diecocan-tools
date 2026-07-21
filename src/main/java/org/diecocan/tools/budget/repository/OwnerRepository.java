package org.diecocan.tools.budget.repository;

import org.diecocan.tools.budget.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
