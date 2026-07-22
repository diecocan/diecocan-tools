package com.diecocan.tools.budget.rest;

import com.diecocan.tools.budget.model.Owner;
import com.diecocan.tools.budget.service.Service;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OwnerController.class)
public class OwnerControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @MockitoBean Service<Owner> service;

    @Test
    void getAllOwners_returns200AndList() throws Exception {
        Owner owner = new Owner("Alice", true);
        owner.setId(1L);
        when(service.findAll()).thenReturn(List.of(owner));

        mockMvc.perform(get("/v1/owners"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Alice"));
    }

    @Test
    void getOwnerById_found_returns200() throws Exception {
        Owner owner = new Owner("Alice", true);
        owner.setId(1L);
        when(service.findById(1L)).thenReturn(Optional.of(owner));

        mockMvc.perform(get("/v1/owners/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Alice"));
    }

    @Test
    void getOwnerById_notFound_returns404() throws Exception {
        when(service.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/v1/owners/{id}", 99L))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Could not find owner: 99"));
    }

    @Test
    void createOwner_returns200AndSavedOwner() throws Exception {
        Owner requestBody = new Owner("Alice", true);
        Owner saved = new Owner("Alice", true);
        saved.setId(1L);
        when(service.save(any(Owner.class))).thenReturn(saved);

        mockMvc.perform(post("/v1/owners")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Alice"));
    }

    @Test
    void updateOwner_found_returns200AndUpdatedOwner() throws Exception {
        Owner existing = new Owner("Alice", true);
        existing.setId(1L);
        Owner requestBody = new Owner("Alice Updated", false);
        Owner saved = new Owner("Alice Updated", false);
        saved.setId(1L);
        when(service.findById(1L)).thenReturn(Optional.of(existing));
        when(service.save(any(Owner.class))).thenReturn(saved);

        mockMvc.perform(put("/v1/owners/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Alice Updated"))
                .andExpect(jsonPath("$.isActive").value(false));
    }

    @Test
    void updateOwner_notFound_returns404() throws Exception {
        Owner requestBody = new Owner("Alice", true);
        when(service.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/v1/owners/{id}", 99L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Could not find owner: 99"));
    }

    @Test
    void deleteOwner_returns200() throws Exception {
        mockMvc.perform(delete("/v1/owners/{id}", 1L))
                .andExpect(status().isOk());

        verify(service).deleteById(1L);
    }
}
