package com.arkontec.springbootbackendapirest.data.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Role implements Serializable {

    private static final long serialVersionUID = -5512036799133057433L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 20)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
