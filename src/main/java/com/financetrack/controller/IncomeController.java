package com.financetrack.controller;

import com.financetrack.dto.IncomeRequest;
import com.financetrack.dto.IncomeResponse;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
@RequiredArgsConstructor
public class IncomeController {
    private final IncomeService incomeService;
    private final UserRepository userRepository;
    @GetMapping
    public List<IncomeResponse> getAll(Authentication authentication){
        User user =
        userRepository.findByEmail(authentication.getName())
        .orElseThrow();
        return incomeService.getAll(user);
    }
    @PostMapping
    public IncomeResponse create(
    @RequestBody IncomeRequest request,
    Authentication authentication
    ){
        User user =
        userRepository.findByEmail(authentication.getName())
        .orElseThrow();
        return incomeService.create(request,user);
    }
    @PutMapping("/{id}")
    public IncomeResponse update(
    @PathVariable int id,
    @RequestBody IncomeRequest request,
    Authentication authentication
    ){
        User user =
        userRepository.findByEmail(authentication.getName())
        .orElseThrow();
        return incomeService.update(id,request,user);
    }
    @DeleteMapping("/{id}")
    public void delete(
    @PathVariable int id,
    Authentication authentication
    ){
        User user =
        userRepository.findByEmail(authentication.getName())
        .orElseThrow();
        incomeService.delete(id,user);
    }
}