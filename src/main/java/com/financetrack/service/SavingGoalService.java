package com.financetrack.service;

import com.financetrack.dto.DeleteSavingGoalRequest;
import com.financetrack.dto.SavingGoalRequest;
import com.financetrack.dto.SavingGoalResponse;

import java.util.List;

public interface SavingGoalService {
    List<SavingGoalResponse> getGoals();
    SavingGoalResponse getGoal(int id);
    SavingGoalResponse create(SavingGoalRequest request);
    SavingGoalResponse update(int id, SavingGoalRequest request);
    void delete(int id, DeleteSavingGoalRequest request);
}