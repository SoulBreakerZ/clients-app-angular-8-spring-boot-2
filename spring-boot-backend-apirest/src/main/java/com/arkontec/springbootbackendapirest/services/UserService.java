package com.arkontec.springbootbackendapirest.services;

import com.arkontec.springbootbackendapirest.data.entities.User;

public interface UserService {

    User findByUsername(String username);
}
