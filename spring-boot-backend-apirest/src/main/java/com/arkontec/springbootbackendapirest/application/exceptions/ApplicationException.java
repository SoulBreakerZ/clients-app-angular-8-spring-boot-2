package com.arkontec.springbootbackendapirest.application.exceptions;

public class ApplicationException extends Exception {

    public ApplicationException(String errorMessage) {
        super(errorMessage);
    }
}
