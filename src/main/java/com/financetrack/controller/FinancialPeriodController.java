package com.financetrack.controller;

import com.financetrack.model.FinancialPeriod;
import com.financetrack.model.User;
import com.financetrack.service.FinancialPeriodService;
import org.springframework.web.bind.annotation.*;
import com.financetrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/financial-periods")
@RequiredArgsConstructor
public class FinancialPeriodController {

    private final FinancialPeriodService financialPeriodService;
    private final UserRepository userRepository;

    @GetMapping
    public List<FinancialPeriod> getAll(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        financialPeriodService
                .ensureActivePeriod(user);

        return financialPeriodService
                .getAll(user);
    }

    @GetMapping("/active")
    public FinancialPeriod getActive(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return financialPeriodService
                .ensureActivePeriod(user);
    }
}