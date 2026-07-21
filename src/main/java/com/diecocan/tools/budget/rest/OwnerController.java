package com.diecocan.tools.budget.rest;

import com.diecocan.tools.budget.exceptions.OwnerNotFoundException;
import com.diecocan.tools.budget.model.Owner;
import com.diecocan.tools.budget.service.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/owners")
public class OwnerController {

    private final Service<Owner> service;

    public OwnerController(Service<Owner> service) {
        this.service = service;
    }

    @GetMapping
    public List<Owner> all() {
        return service.findAll();
    }

    @PostMapping
    public Owner newOwner(@RequestBody Owner newOwner) {
        return service.save(newOwner);
    }

    @GetMapping("/{id}")
    public Owner one(@PathVariable Long id) {
        return service.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Owner updateOwner(@RequestBody Owner newOwner, @PathVariable Long id) {
        return service.findById(id)
                .map(owner -> {
                    owner.setName(newOwner.getName());
                    owner.setIsActive(newOwner.getIsActive());

                    return service.save(owner);
                })
                .orElseThrow(() -> new OwnerNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public void deleteOwner(@PathVariable long id) {
        service.deleteById(id);
    }
 }
