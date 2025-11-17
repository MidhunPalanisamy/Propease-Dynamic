package com.myprojects.Propease_BE.Controllers;

import com.myprojects.Propease_BE.Models.User;
import com.myprojects.Propease_BE.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public User signUp(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        
        try {
            User user = authService.authenticate(email, password);
            if (user != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", user.getId());
                response.put("email", user.getEmail());
                response.put("message", "Login Successful");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid email or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message", "Login failed"));
        }
    }
}
