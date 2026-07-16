package com.financetrack.repository;

import com.financetrack.model.SavingGoal;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavingGoalRepository extends JpaRepository<SavingGoal, Integer> {
    List<SavingGoal> findByUser(User user);
    Optional<SavingGoal> findByIdAndUser(int id, User user);

}