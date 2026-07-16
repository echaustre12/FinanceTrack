package com.financetrack.service;

import com.financetrack.dto.SavingContributionRequest;
import com.financetrack.dto.SavingContributionResponse;
import com.financetrack.model.SavingContribution;
import com.financetrack.model.SavingGoal;
import com.financetrack.model.User;
import com.financetrack.repository.SavingContributionRepository;
import com.financetrack.repository.SavingGoalRepository;
import com.financetrack.service.UserService;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class SavingContributionService {

    private final SavingContributionRepository savingContributionRepository;
    private final SavingGoalRepository savingGoalRepository;
    private final UserService userService;


    public SavingContributionService(
            SavingContributionRepository savingContributionRepository,
            SavingGoalRepository savingGoalRepository,
            UserService userService
    ) {
        this.savingContributionRepository = savingContributionRepository;
        this.savingGoalRepository = savingGoalRepository;
        this.userService = userService;
    }

    public List<SavingContributionResponse> getByGoal(int goalId) {
        User user = userService.getAuthenticatedUser();
        SavingGoal goal = savingGoalRepository
                .findByIdAndUser(goalId, user)
                .orElseThrow(() ->
                        new RuntimeException("Meta de ahorro no encontrada")
                );
        return savingContributionRepository
                .findBySavingGoalOrderByContributionDateDesc(goal)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public SavingContributionResponse create(
            int goalId,
            SavingContributionRequest request
    ) {
        User user = userService.getAuthenticatedUser();
        SavingGoal goal = savingGoalRepository
                .findByIdAndUser(goalId, user)
                .orElseThrow(() ->
                        new RuntimeException("Meta de ahorro no encontrada")
                );
        SavingContribution contribution = new SavingContribution();
        contribution.setAmount(request.getAmount());
        contribution.setDescription(request.getDescription());
        contribution.setSavingGoal(goal);
        goal.setCurrentAmount(
                goal.getCurrentAmount()
                        .add(request.getAmount())
        );
        savingGoalRepository.save(goal);
        SavingContribution saved = savingContributionRepository.save(contribution);
        return mapToResponse(saved);
    }

    @Transactional
    public SavingContributionResponse update(
            int id,
            SavingContributionRequest request
    ) {
        User user = userService.getAuthenticatedUser();
        SavingContribution contribution =
                savingContributionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Contribución no encontrada"
                                )
                        );
        SavingGoal goal = contribution.getSavingGoal();
        if (goal.getUser().getId() != user.getId()) {
            throw new RuntimeException(
                    "No tiene permisos para editar esta contribución"
            );
        }
        BigDecimal difference =
                request.getAmount()
                        .subtract(contribution.getAmount());
        goal.setCurrentAmount(
                goal.getCurrentAmount()
                        .add(difference)
        );
        contribution.setAmount(request.getAmount());
        contribution.setDescription(request.getDescription());
        savingGoalRepository.save(goal);
        SavingContribution updated = savingContributionRepository.save(contribution);
        return mapToResponse(updated);
    }

    @Transactional
    public void delete(int id) {
        User user = userService.getAuthenticatedUser();
        SavingContribution contribution =
                savingContributionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Contribución no encontrada"
                                )
                        );
        SavingGoal goal = contribution.getSavingGoal();
        if (goal.getUser().getId() != user.getId()) {
            throw new RuntimeException(
                    "No tiene permisos para eliminar esta contribución"
            );
        }
        goal.setCurrentAmount(
                goal.getCurrentAmount()
                        .subtract(contribution.getAmount())
        );
        savingGoalRepository.save(goal);
        savingContributionRepository.delete(contribution);
    }

    private SavingContributionResponse mapToResponse(
            SavingContribution contribution
    ) {
        return new SavingContributionResponse(
                contribution.getId(),
                contribution.getAmount(),
                contribution.getDescription(),
                contribution.getContributionDate()
        );
    }
}