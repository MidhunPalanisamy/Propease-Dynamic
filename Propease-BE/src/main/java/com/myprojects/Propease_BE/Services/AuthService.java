package com.myprojects.Propease_BE.Services;

import com.myprojects.Propease_BE.Models.User;
import com.myprojects.Propease_BE.Repositoy.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User foundUser = user.get();
            // Compare passwords (trim whitespace and case-sensitive)
            if (foundUser.getPassword() != null &&
                foundUser.getPassword().trim().equals(password.trim())) {
                return foundUser;
            }
        }
        return null;
    }
}
