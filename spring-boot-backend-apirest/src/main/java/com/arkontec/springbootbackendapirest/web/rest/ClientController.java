package com.arkontec.springbootbackendapirest.web.rest;

import com.arkontec.springbootbackendapirest.data.entities.Client;
import com.arkontec.springbootbackendapirest.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client> findAll() {
        return this.clientService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {

        Client client = null;
        Map<String, Object> response = new HashMap<>();

        try{
            client = this.clientService.findById(id);
        }catch (DataAccessException e){
            response.put("message","error when querying the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (client == null){
            response.put("message","Client with ID:".concat(id.toString().concat(" not exists in database.")));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Client>(client,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Client client, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();
        Client newClient = null;

        if (bindingResult.hasErrors()){
            response.put("errors",bindingResult.getFieldErrors()
                    .stream()
                    .map(e -> "The field "+e.getField()+"' '"+ e.getDefaultMessage())
                    .collect(Collectors.toList()));

            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.BAD_REQUEST);
        }

        try {
            newClient = clientService.save(client);
        }catch (DataAccessException e){
            response.put("message","error when insert to the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<Client>(newClient,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Valid @RequestBody Client client, BindingResult bindingResult) {

        Map<String, Object> response = new HashMap<>();
        Client currentClient = this.clientService.findById(id);
        Client clientUpdated = null;

        if (bindingResult.hasErrors()){
            response.put("errors",bindingResult.getFieldErrors()
                    .stream()
                    .map(e -> "The field "+e.getField()+"' '"+ e.getDefaultMessage())
                    .collect(Collectors.toList()));

            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.BAD_REQUEST);
        }

        if (currentClient == null){
            response.put("message","Client with ID:".concat(id.toString().concat(" not exists in database.")));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
        }

        try {
            clientUpdated = clientService.save(client);
        }catch (DataAccessException e){
            response.put("message","error when insert to the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return new ResponseEntity<Client>(clientUpdated,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        try {
            this.clientService.deleteById(id);
        }catch (DataAccessException e){
            response.put("message","error when insert to the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message","Client has been deleted with success.");
        return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NO_CONTENT);
    }
}
