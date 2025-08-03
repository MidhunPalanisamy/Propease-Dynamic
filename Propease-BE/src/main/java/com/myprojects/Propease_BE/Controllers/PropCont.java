package com.myprojects.Propease_BE.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myprojects.Propease_BE.Models.Property;
import com.myprojects.Propease_BE.Services.PropServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PropCont {

    @Autowired
    PropServ ps;

    @GetMapping("/allProperty")
    public List<Property> retrieve() {
        return ps.getAllProp();
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProp(@RequestParam("property") String propertyJson,
                                     @RequestParam("imgD") MultipartFile imgD) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Property property = objectMapper.readValue(propertyJson, Property.class);

            if (imgD != null && !imgD.isEmpty()) {
                property.setImage(imgD.getBytes());
                property.setImageContentType(imgD.getContentType());
            }

            String message = ps.insertProp(property);
            return new ResponseEntity<>(message, HttpStatus.CREATED);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error adding property: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {
        Property prp = ps.getProduct(productId);

        if (prp == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageFile = prp.getImage();
        String contentType = prp.getImageContentType();

        if (imageFile == null || contentType == null || contentType.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        try {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(contentType))
                    .body(imageFile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
