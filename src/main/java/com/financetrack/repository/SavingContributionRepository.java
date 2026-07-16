package com.financetrack.repository;

import com.financetrack.model.SavingContribution;
import com.financetrack.model.SavingGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingContributionRepository extends JpaRepository<SavingContribution, Integer>{
    List<SavingContribution> findBySavingGoalOrderByContributionDateDesc(SavingGoal savingGoa);
}