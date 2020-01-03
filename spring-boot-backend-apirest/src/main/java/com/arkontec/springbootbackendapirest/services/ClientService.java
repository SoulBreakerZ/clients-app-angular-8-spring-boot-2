package com.arkontec.springbootbackendapirest.services;

import com.arkontec.springbootbackendapirest.data.entities.Client;

import java.util.List;

public interface ClientService {
    List<Client> findAll();
    Client findById(Long id);
    Client save(Client client);
    void deleteById(Long id);
}
