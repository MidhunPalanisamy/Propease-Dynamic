package com.myprojects.Propease_BE.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myprojects.Propease_BE.Repositoy.PropRepo;
import com.myprojects.Propease_BE.Models.Property;

import java.util.List;

@Service
public class PropServ {

    @Autowired
    PropRepo pr;

    public String insertProp(Property p) {
        pr.save(p);
        return "Inserted Successfully";
    }

    public Property getProduct(int id) {
        return pr.findById(id).orElse(null);
    }

    public List<Property> getAllProp() {
        return pr.findAll();
    }
}
