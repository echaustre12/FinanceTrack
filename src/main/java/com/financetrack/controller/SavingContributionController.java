package com.financetrack.controller;

import com.financetrack.dto.SavingContributionRequest;
import com.financetrack.dto.SavingContributionResponse;
import com.financetrack.service.SavingContributionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/saving-contributions")
public class SavingContributionController {
    private final SavingContributionService savingContributionService;

    public SavingContributionController(
            SavingContributionService savingContributionService
    ) {
        this.savingContributionService = savingContributionService;
    }
    @GetMapping("/goal/{goalId}")
    public ResponseEntity<List<SavingContributionResponse>> getByGoal(
            @PathVariable int goalId
    ) {
        return ResponseEntity.ok(
                savingContributionService.getByGoal(goalId)
        );
    }
    @PostMapping("/goal/{goalId}")
    public ResponseEntity<SavingContributionResponse> create(
            @PathVariable int goalId,
            @RequestBody SavingContributionRequest request
    ) {
        return ResponseEntity.ok(
                savingContributionService.create(goalId, request)
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<SavingContributionResponse> update(
            @PathVariable int id,
            @RequestBody SavingContributionRequest request
    ) {
        return ResponseEntity.ok(
                savingContributionService.update(id, request)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable int id
    ) {
        savingContributionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}