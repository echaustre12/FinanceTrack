package com.financetrack.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class CategoryBudgetId {

    private long categoryId;
    private long financialPeriodId;

    protected CategoryBudgetId() {
        // Constructor requerido por JPA
    }

    public CategoryBudgetId(long categoryId, long financialPeriodId) {
        this.categoryId = categoryId;
        this.financialPeriodId = financialPeriodId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public long getFinancialPeriodId() {
        return financialPeriodId;
    }

    public void setFinancialPeriodId(long financialPeriodId) {
        this.financialPeriodId = financialPeriodId;
    }
}