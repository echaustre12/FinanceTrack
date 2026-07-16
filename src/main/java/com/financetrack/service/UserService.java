package com.financetrack.service;

import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.dto.RegisterRequest;
import com.financetrack.service.FinancialPeriodService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FinancialPeriodService financialPeriodService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FinancialPeriodService financialPeriodService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.financialPeriodService = financialPeriodService;
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

    public User register(RegisterRequest request) {
        if (request.getName() == null || request.getName().isBlank()){
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (request.getPassword() == null || request.getPassword().length() < 8){
            throw new IllegalArgumentException("La contraseña debe tener al menos 8 caracteres");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()){
            throw new IllegalArgumentException("El correo es obligatorio");
        }
        if (!request.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")){
            throw new IllegalArgumentException("El formato del correo no es válido");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("Ya existe un usuario con el correo registrado");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);
        financialPeriodService.createCurrentPeriod(saved);

        return saved;
    }

    public User getAuthenticatedUser() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuario no autenticado");
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Usuario no encontrado"
                        )
                );
    }
}