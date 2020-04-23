package com.arkontec.springbootbackendapirest.data.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 4512707023585174398L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,length = 20)
    private String username;

    @Column(length = 60)
    private String password;

    private Boolean enabled;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    //@JoinTable(name = "users_authorities",joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn("role_id"),uniqueConstaint(columnNames={"usuario_id"},"role_id"))
    private List<Role> roles;

    private String name;
    private String lastName;

    @Column(unique = true)
    private String email;

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

}
