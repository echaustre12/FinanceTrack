package com.financetrack.dto;

import java.math.BigDecimal;

public class SavingGoalRequest {

    private String name;
    private BigDecimal targetAmount;

    public SavingGoalRequest() {
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public BigDecimal getTargetAmount() {
        return targetAmount;
    }
    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }
}