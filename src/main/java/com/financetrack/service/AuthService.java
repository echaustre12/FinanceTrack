package com.financetrack.service;

import com.financetrack.dto.AuthResponse;
import com.financetrack.dto.LoginRequest;
import com.financetrack.dto.RegisterRequest;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (request.getName() == null || request.getName().isBlank()) {
            throw new RuntimeException("El nombre es obligatorio.");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("El correo es obligatorio.");
        }

        if (!request.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new RuntimeException("El formato del correo no es válido.");
        }

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new RuntimeException(
                    "La contraseña debe tener al menos 8 caracteres."
            );
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException(
                    "Ya existe un usuario con ese correo."
            );
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user = userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Correo o contraseña incorrectos."
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException(
                    "Correo o contraseña incorrectos."
            );
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}