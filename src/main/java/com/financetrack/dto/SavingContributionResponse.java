package com.financetrack.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SavingContributionResponse {
    private int id;
    private BigDecimal amount;
    private String description;
    private LocalDate contributionDate;

    public SavingContributionResponse() {
    }
    public SavingContributionResponse(int id, BigDecimal amount, String description, LocalDate contributionDate) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.contributionDate = contributionDate;
    }

    public int getId() {
        return id;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public String getDescription() {
        return description;
    }
    public LocalDate getContributionDate() {
        return contributionDate;
    }
}