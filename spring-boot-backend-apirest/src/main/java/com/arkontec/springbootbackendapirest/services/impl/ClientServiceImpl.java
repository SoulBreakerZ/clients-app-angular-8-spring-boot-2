package com.arkontec.springbootbackendapirest.services.impl;

import com.arkontec.springbootbackendapirest.data.DAOClient;
import com.arkontec.springbootbackendapirest.data.entities.Client;
import com.arkontec.springbootbackendapirest.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService{

    @Autowired
    private DAOClient daoClient;

    @Override
    @Transactional(readOnly = true)
    public List<Client> findAll() {
        return (List<Client>) daoClient.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Client findById(Long id) {
        return daoClient.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Client save(Client client) {
        return daoClient.save(client);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        daoClient.deleteById(id);
    }
}
