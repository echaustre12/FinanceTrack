package com.financetrack.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CategoryBudgetId implements Serializable {

    private int categoryId;
    private int financialPeriodId;

    protected CategoryBudgetId() {
        // Constructor requerido por JPA
    }

    public CategoryBudgetId(int categoryId, int financialPeriodId) {
        this.categoryId = categoryId;
        this.financialPeriodId = financialPeriodId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getFinancialPeriodId() {
        return financialPeriodId;
    }

    public void setFinancialPeriodId(int financialPeriodId) {
        this.financialPeriodId = financialPeriodId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategoryBudgetId that)) {
            return false;
        }
        return categoryId == that.categoryId
                && financialPeriodId == that.financialPeriodId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, financialPeriodId);
    }
}