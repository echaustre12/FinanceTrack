package com.financetrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "category_budget")
public class CategoryBudget {

    @EmbeddedId
    private CategoryBudgetId id;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @MapsId("financialPeriodId")
    @JoinColumn(name = "financial_period_id")
    private FinancialPeriod financialPeriod;

    @Column(name = "budget_limit", nullable = false)
    private long budgetLimit;
}