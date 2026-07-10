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

    @Column(name = "contribution_date", nullable = false, insertable = false, updatable = false)
    private LocalDate contributionDate;

    @ManyToOne
    @JoinColumn(name = "saving_goal_id", nullable = false)
    private SavingGoal savingGoal;
}