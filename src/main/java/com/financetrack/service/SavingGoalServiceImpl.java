package com.financetrack.service;

import com.financetrack.dto.DeleteSavingGoalRequest;
import com.financetrack.dto.SavingGoalRequest;
import com.financetrack.dto.SavingGoalResponse;
import com.financetrack.model.SavingContribution;
import com.financetrack.model.SavingGoal;
import com.financetrack.model.User;
import com.financetrack.repository.SavingGoalRepository;
import com.financetrack.repository.SavingContributionRepository;
import com.financetrack.service.SavingGoalService;
import com.financetrack.service.UserService;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SavingGoalServiceImpl implements SavingGoalService {

    private final SavingGoalRepository savingGoalRepository;
    private final SavingContributionRepository savingContributionRepository;
    private final UserService userService;


    public SavingGoalServiceImpl(
            SavingGoalRepository savingGoalRepository,
            SavingContributionRepository savingContributionRepository,
            UserService userService
    ) {
        this.savingGoalRepository = savingGoalRepository;
        this.savingContributionRepository = savingContributionRepository;
        this.userService = userService;
    }


    @Override
    public List<SavingGoalResponse> getGoals() {

        User user = userService.getAuthenticatedUser();

        return savingGoalRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public SavingGoalResponse getGoal(int id) {

        User user = userService.getAuthenticatedUser();

        SavingGoal goal = savingGoalRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Meta de ahorro no encontrada")
                );

        return mapToResponse(goal);
    }


    @Override
    @Transactional
    public SavingGoalResponse create(
            SavingGoalRequest request
    ) {

        User user = userService.getAuthenticatedUser();


        SavingGoal goal = new SavingGoal();

        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setCurrentAmount(BigDecimal.ZERO);
        goal.setUser(user);


        SavingGoal saved =
                savingGoalRepository.save(goal);


        return mapToResponse(saved);
    }


    @Override
    @Transactional
    public SavingGoalResponse update(
            int id,
            SavingGoalRequest request
    ) {

        User user = userService.getAuthenticatedUser();


        SavingGoal goal =
                savingGoalRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Meta de ahorro no encontrada"
                                )
                        );


        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());


        SavingGoal updated =
                savingGoalRepository.save(goal);


        return mapToResponse(updated);
    }


    @Override
    @Transactional
    public void delete(
            int id,
            DeleteSavingGoalRequest request
    ) {

        User user = userService.getAuthenticatedUser();


        SavingGoal goal =
                savingGoalRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Meta de ahorro no encontrada"
                                )
                        );


        BigDecimal amount =
                goal.getCurrentAmount();


        /*
         * Si la meta tiene dinero acumulado,
         * se transfiere a otra meta existente.
         */
        if (amount.compareTo(BigDecimal.ZERO) > 0) {


            SavingGoal destinationGoal =
                    savingGoalRepository
                            .findByIdAndUser(
                                    request.getDestinationGoalId(),
                                    user
                            )
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Meta destino no encontrada"
                                    )
                            );


            if (destinationGoal.getId() == goal.getId()) {
                throw new RuntimeException(
                        "No puede transferir una meta a sí misma"
                );
            }


            destinationGoal.setCurrentAmount(
                    destinationGoal
                            .getCurrentAmount()
                            .add(amount)
            );


            SavingContribution transfer =
                    new SavingContribution();

            transfer.setAmount(amount);

            transfer.setDescription(
                    "Fondos transferidos desde la meta "
                            + goal.getName()
            );

            transfer.setSavingGoal(destinationGoal);


            savingContributionRepository.save(transfer);

            savingGoalRepository.save(destinationGoal);
        }


        savingGoalRepository.delete(goal);
    }


    private SavingGoalResponse mapToResponse(
            SavingGoal goal
    ) {

        return new SavingGoalResponse(
                goal.getId(),
                goal.getName(),
                goal.getTargetAmount(),
                goal.getCurrentAmount()
        );
    }
}