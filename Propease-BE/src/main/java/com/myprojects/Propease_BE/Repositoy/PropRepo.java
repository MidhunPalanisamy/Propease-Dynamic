package com.myprojects.Propease_BE.Repositoy;

import com.myprojects.Propease_BE.Models.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropRepo extends JpaRepository<Property, Integer> {
}
