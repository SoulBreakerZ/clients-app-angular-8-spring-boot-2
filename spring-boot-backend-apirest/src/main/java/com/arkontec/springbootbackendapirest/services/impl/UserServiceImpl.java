package com.arkontec.springbootbackendapirest.services.impl;

import com.arkontec.springbootbackendapirest.data.DAOUser;
import com.arkontec.springbootbackendapirest.data.entities.User;
import com.arkontec.springbootbackendapirest.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private DAOUser daoUser;

    private final Logger logger = LogManager.getLogger(UserServiceImpl.class);

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = daoUser.findByUsername(username);

        if(user == null) {
            logger.error("User not exists in system");
            throw new UsernameNotFoundException("User not exists in system");
        }

        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .peek(authority -> logger.info("Role: "+authority.getAuthority()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),user.getEnabled(),true,true,true,authorities);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return daoUser.findByUsername(username);
    }
}
