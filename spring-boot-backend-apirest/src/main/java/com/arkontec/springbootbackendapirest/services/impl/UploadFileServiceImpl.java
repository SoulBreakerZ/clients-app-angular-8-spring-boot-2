package com.arkontec.springbootbackendapirest.services.impl;

import com.arkontec.springbootbackendapirest.services.UploadFileService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFileServiceImpl implements UploadFileService {

    private final Logger LOGGER = LogManager.getLogger(UploadFileServiceImpl.class);

    private final static String PATH_UPLOAD_DIRECTORY = "uploads";

    @Override
    public Resource loadImage(String imageName) throws MalformedURLException {
        Path filepath = this.getPath(imageName);
        LOGGER.info(filepath.toString());
        Resource resource = new UrlResource(filepath.toUri());
        if(!resource.exists() && !resource.isReadable()){
            filepath = Paths.get("src/main/resources/static/img").resolve("default-profile.png").toAbsolutePath();
            resource = new UrlResource(filepath.toUri());
        }
        return resource;
    }

    @Override
    public String imageCopy(MultipartFile file) throws IOException {
        String imageName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
        Path filepath = this.getPath(imageName);
        LOGGER.info(filepath.toString());
        Files.copy(file.getInputStream(),filepath);
        return imageName;
    }

    @Override
    public boolean deleteImage(String imageName) {
        if(imageName != null && imageName.length() > 0){
            Path previousFilepath = Paths.get("uploads").resolve(imageName).toAbsolutePath();
            File previousFilephoto = previousFilepath.toFile();
            if(previousFilephoto.exists() && previousFilephoto.canRead()){
                previousFilephoto.delete();
                return true;
            }
        }
        return false;
    }

    @Override
    public Path getPath(String imageName) {
        return Paths.get(PATH_UPLOAD_DIRECTORY).resolve(imageName).toAbsolutePath();
    }
}
