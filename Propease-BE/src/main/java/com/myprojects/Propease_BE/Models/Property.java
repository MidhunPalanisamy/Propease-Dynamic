package com.myprojects.Propease_BE.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Property {

    @Id
    @GeneratedValue
    private int id;
    private String address;
    private String contact;
    private String email;
    private double latitude;
    private double longitude;
    @Lob
    private byte[] image;
    private String imageContentType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() { 
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) { 
        this.imageContentType = imageContentType;
    }
    
    
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    // Other getters and setters stay the same...

    public Property(int id, String address, String contact, String email,
                    double latitude, double longitude,
                    byte[] image, String imageContentType) {
        this.id = id;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
        this.imageContentType = imageContentType;
    }

    public Property() {}

    @Override
    public String toString() {
        return "Property [id=" + id + ", address=" + address + ", contact=" + contact +
                ", email=" + email + ", latitude=" + latitude + ", longitude=" + longitude + "]";
    }
}