package com.arkontec.springbootbackendapirest.data;

import com.arkontec.springbootbackendapirest.data.entities.Client;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DAOClient extends PagingAndSortingRepository<Client,Long> {

}
