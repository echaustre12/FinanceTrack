package com.financetrack.controller;

import com.financetrack.dto.ExpenseRequest;
import com.financetrack.dto.ExpenseResponse;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    private final UserRepository userRepository;

    @GetMapping
    public List<ExpenseResponse> getAll(
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        return expenseService.getAll(user);

    }

    @GetMapping("/{id}")
    public ExpenseResponse getById(
            @PathVariable int id,
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        return expenseService.getById(id, user);

    }

    @PostMapping
    public ExpenseResponse create(
            @RequestBody ExpenseRequest request,
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        return expenseService.create(request, user);

    }

    @PutMapping("/{id}")
    public ExpenseResponse update(
            @PathVariable int id,
            @RequestBody ExpenseRequest request,
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        return expenseService.update(id, request, user);

    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable int id,
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(authentication.getName())
                        .orElseThrow();

        expenseService.delete(id, user);

    }

}