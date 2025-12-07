package com.bibliotheque.borrowservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "BOOK-SERVICE")
public interface BookClient {

    @PutMapping("/api/books/{id}")
    void updateBook(@PathVariable("id") Long id, @RequestBody BookUpdateRequest request);

    record BookUpdateRequest(String statut) {}
}