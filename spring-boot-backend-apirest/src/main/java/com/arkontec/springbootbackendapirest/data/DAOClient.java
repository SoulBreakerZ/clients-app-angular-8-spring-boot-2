package com.arkontec.springbootbackendapirest.data;

import com.arkontec.springbootbackendapirest.data.entities.Client;
import com.arkontec.springbootbackendapirest.data.entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DAOClient extends JpaRepository<Client,Long> {

    @Query("from Region")
    List<Region> findAllRegions();

}
