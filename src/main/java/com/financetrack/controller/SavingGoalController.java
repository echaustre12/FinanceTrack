package com.financetrack.controller;

import com.financetrack.dto.DeleteSavingGoalRequest;
import com.financetrack.dto.SavingGoalRequest;
import com.financetrack.dto.SavingGoalResponse;
import com.financetrack.service.SavingGoalService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/saving-goals")
public class SavingGoalController {
    private final SavingGoalService savingGoalService;
    public SavingGoalController(
            SavingGoalService savingGoalService
    ) {
        this.savingGoalService = savingGoalService;
    }
    @GetMapping
    public ResponseEntity<List<SavingGoalResponse>> getGoals() {
        return ResponseEntity.ok(
                savingGoalService.getGoals()
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<SavingGoalResponse> getGoal(
            @PathVariable int id
    ) {
        return ResponseEntity.ok(
                savingGoalService.getGoal(id)
        );
    }
    @PostMapping
    public ResponseEntity<SavingGoalResponse> create(
            @RequestBody SavingGoalRequest request
    ) {
        return ResponseEntity.ok(
                savingGoalService.create(request)
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<SavingGoalResponse> update(
            @PathVariable int id,
            @RequestBody SavingGoalRequest request
    ) {
        return ResponseEntity.ok(
                savingGoalService.update(id, request)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable int id,
            @RequestBody DeleteSavingGoalRequest request
    ) {
        savingGoalService.delete(id, request);
        return ResponseEntity.noContent().build();
    }
}