package com.financetrack.controller;


import com.financetrack.dto.PaymentMethodRequest;
import com.financetrack.model.PaymentMethod;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.service.PaymentMethodService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/api/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {



    private final PaymentMethodService paymentMethodService;
    private final UserRepository userRepository;



    private User getUser(Authentication authentication){

        return userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Usuario no encontrado"
                        )
                );

    }



    @GetMapping
    public List<PaymentMethod> getAll(
            Authentication authentication
    ){

        return paymentMethodService
                .getPaymentMethods(
                        getUser(authentication)
                );
    }



    @PostMapping
    public PaymentMethod create(
            @Valid
            @RequestBody PaymentMethodRequest request,
            Authentication authentication
    ){

        return paymentMethodService
                .createPaymentMethod(
                        getUser(authentication),
                        request
                );
    }



    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Integer id,
            Authentication authentication
    ){

        paymentMethodService.deletePaymentMethod(
                getUser(authentication),
                id
        );

    }
}