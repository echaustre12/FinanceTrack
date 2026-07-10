package com.financetrack.service;

import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }

    public User register(String name, String password, String email, String phoneNumber) {
        if (name == null || name.isBlank()){
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (password == null || password.length() < 8){
            throw new IllegalArgumentException("La contraseña debe tener al menos 8 caracteres");
        }
        if (email == null || email.isBlank()){
            throw new IllegalArgumentException("El correo es obligatorio");
        }
        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")){
            throw new IllegalArgumentException("El formato del correo no es válido");
        }
        if (userRepository.findByEmail(email).isPresent()){
            throw new IllegalArgumentException("El correo ya se encuentra registrado");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(passwordEncoder.encode(password));

        return userRepository.save(user);
    }
}