package com.arkontec.springbootbackendapirest.web.rest;

import com.arkontec.springbootbackendapirest.data.entities.Client;
import com.arkontec.springbootbackendapirest.data.entities.Region;
import com.arkontec.springbootbackendapirest.services.ClientService;
import com.arkontec.springbootbackendapirest.services.UploadFileService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
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

    @Autowired
    private UploadFileService uploadFileService;

    private final Logger logger = LogManager.getLogger(ClientController.class);

    @GetMapping
    public List<Client> findAll() {
        return this.clientService.findAll();
    }

    @GetMapping("/page/{page}")
    public Page<Client> findAll(@PathVariable Integer page) {
        return this.clientService.findAll(PageRequest.of(page,4));
    }

    @Secured({"ROLE_USER","ROLE_ADMIN"})
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

    @Secured("ROLE_ADMIN")
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

    @Secured("ROLE_ADMIN")
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
            // Esto se hace asi por mientras pero como codigo es ineficinete y repetitivo deberia preguntar si el objeto
            // client que llega con parametros tienes cambios con respecto  al objeto currentClient
            currentClient.setName(client.getName());
            currentClient.setLastName(client.getLastName());
            currentClient.setCreatedDate(client.getCreatedDate());
            currentClient.setEmail(client.getEmail());
            currentClient.setRegion(client.getRegion());
            clientUpdated = clientService.save(currentClient);
        }catch (DataAccessException e){
            response.put("message","error when insert to the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return new ResponseEntity<Client>(clientUpdated,HttpStatus.OK);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        try {
            Client client = this.clientService.findById(id);
            this.uploadFileService.deleteImage(client.getImage());
            this.clientService.deleteById(id);
        }catch (DataAccessException e){
            response.put("message","error when insert to the database.");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message","Client has been deleted with success.");
        return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NO_CONTENT);
    }

    @Secured({"ROLE_USER","ROLE_ADMIN"})
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,@RequestParam("id") Long id){

        Map<String, Object> response = new HashMap<>();
        Client client = this.clientService.findById(id);

        if(!file.isEmpty()){

            String filename = null;
            try {
                filename = this.uploadFileService.imageCopy(file);
            } catch (IOException e) {
                response.put("message","error when upload file." + filename);
                response.put("error",e.getMessage().concat(": ").concat(e.getMessage()));
                return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
            }

            this.uploadFileService.deleteImage(client.getImage());

            client.setImage(filename);
            clientService.save(client);
            response.put("client",client);
            response.put("message","File image has associated with client successfully.");

            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CREATED);
        }

        response.put("message","File image is empty.");
        return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NO_CONTENT);
    }

    @GetMapping("/upload/img/{imageName:.+}")
    public ResponseEntity<Resource> viewImage(@PathVariable String imageName){
        Resource resource = null;
        try {
            resource = this.uploadFileService.loadImage(imageName);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + resource.getFilename() + "\"");

        return new ResponseEntity<Resource>(resource,header,HttpStatus.OK);
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/region")
    public List<Region> findAllRegions() {
        return this.clientService.findAllRegions();
    }



}
