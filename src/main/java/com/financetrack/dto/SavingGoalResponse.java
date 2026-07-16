package com.financetrack.dto;

import java.math.BigDecimal;

public class SavingGoalResponse {
    private int id;
    private String name;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;

    public SavingGoalResponse() {
    }
    public SavingGoalResponse(int id, String name, BigDecimal targetAmount, BigDecimal currentAmount) {
        this.id = id;
        this.name = name;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public BigDecimal getTargetAmount() {
        return targetAmount;
    }
    public BigDecimal getCurrentAmount() {
        return currentAmount;
    }
}