package com.arkontec.springbootbackendapirest.services.impl;

import com.arkontec.springbootbackendapirest.data.DAOClient;
import com.arkontec.springbootbackendapirest.data.entities.Client;
import com.arkontec.springbootbackendapirest.data.entities.Region;
import com.arkontec.springbootbackendapirest.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Client> findAll(Pageable pageable) {
        return daoClient.findAll(pageable);
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

    @Override
    @Transactional(readOnly = true)
    public List<Region> findAllRegions() {
        return (List<Region>) daoClient.findAllRegions();
    }
}
