package com.financetrack.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "saving_contribution")
public class SavingContribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 150)
    private String description;

    @Column(name = "contribution_date", nullable = false)
    private LocalDate contributionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saving_goal_id", nullable = false)
    private SavingGoal savingGoal;

    public SavingContribution() {
    }

    public SavingContribution(BigDecimal amount, String description, SavingGoal savingGoal) {
        this.amount = amount;
        this.description = description;
        this.savingGoal = savingGoal;
    }

    @PrePersist
    public void prePersist() {
        contributionDate = LocalDate.now();
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDate getContributionDate() {
        return contributionDate;
    }
    public void setContributionDate(LocalDate contributionDate) {
        this.contributionDate = contributionDate;
    }
    public SavingGoal getSavingGoal() {
        return savingGoal;
    }
    public void setSavingGoal(SavingGoal savingGoal) {
        this.savingGoal = savingGoal;
    }
}