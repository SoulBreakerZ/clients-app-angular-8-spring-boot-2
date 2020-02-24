package com.arkontec.springbootbackendapirest.data;

import com.arkontec.springbootbackendapirest.data.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface DAOUser extends CrudRepository<User,Long> {

    public User findByUsername(String username);

    @Query("select u from User u where u.username=?1")
    public User findByUsername2(String username);

    //public User findByUserNameAndEmail(String userName,String email);
}
