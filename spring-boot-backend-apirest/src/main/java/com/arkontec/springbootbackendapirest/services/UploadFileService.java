package com.arkontec.springbootbackendapirest.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

public interface UploadFileService {

    Resource loadImage(String imageName) throws MalformedURLException;
    String imageCopy(MultipartFile file) throws IOException;
    boolean deleteImage(String imageName);
    Path getPath(String imageName);
}
