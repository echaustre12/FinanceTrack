package com.financetrack.controller;

import com.financetrack.dto.RecurringPaymentRequest;
import com.financetrack.dto.RecurringPaymentResponse;
import com.financetrack.model.RecurringPayment;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.service.JwtService;
import com.financetrack.service.RecurringPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recurring-payments")
public class RecurringPaymentController {

    private final RecurringPaymentService service;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public RecurringPaymentController(
            RecurringPaymentService service,
            UserRepository userRepository,
            JwtService jwtService
    ) {
        this.service = service;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    private User getUser(
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        String email =
                jwtService
                        .extractUsername(token);

        return userRepository
                .findByEmail(email)
                .orElseThrow();
    }

    @GetMapping
    public List<RecurringPaymentResponse>
    findAll(
            @RequestHeader("Authorization")
            String auth
    ) {

        return service.findAll(
                getUser(auth)
        );
    }

    @PostMapping
    public RecurringPaymentResponse create(
            @RequestBody
            RecurringPaymentRequest request,

            @RequestHeader("Authorization")
            String auth
    ) {

        return service.create(
                request,
                getUser(auth)
        );
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable int id,

            @RequestHeader("Authorization")
            String auth
    ) {

        service.delete(
                id,
                getUser(auth)
        );
    }
}