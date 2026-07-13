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
    private final FinancialPeriodService financialPeriodService;

    public AuthResponse register(RegisterRequest request) {

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Por favor ingresa tu nombre.");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Por favor ingresa tu correo electrónico.");
        }

        if (!request.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Ingresa un correo electrónico válido.");
        }

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new IllegalArgumentException(
                    "Por tu seguridad, la contraseña debe tener al menos 8 caracteres."
            );
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException(
                    "Ya existe un usuario con ese correo."
            );
        }

        if (request.getPhoneNumber() == null || request.getPhoneNumber().length() < 10) {
            throw new IllegalArgumentException(
                    "Ingresa un número de telefono válido."
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

        financialPeriodService.createCurrentPeriod(user);

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
                        () -> new IllegalArgumentException(
                                "El correo o la contraseña son incorrectos."
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new IllegalArgumentException(
                    "El correo o la contraseña son incorrectos."
            );
        }

        financialPeriodService.ensureActivePeriod(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}