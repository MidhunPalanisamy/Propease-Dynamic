package com.myprojects.Propease_BE.Controllers;

import com.myprojects.Propease_BE.Models.User;
import com.myprojects.Propease_BE.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestBody User loginUser) {
        boolean valid = authService.authenticate(loginUser.getEmail(), loginUser.getPassword());
        return valid ? "Login Successful" : "Invalid Credentials";
    }
}
