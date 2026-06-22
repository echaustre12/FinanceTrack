package com.financetrack.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class CategoryBudgetId {
    private long categoryId;
    private long financialPeriodId;

    public CategoryBudgetId() {}
}
