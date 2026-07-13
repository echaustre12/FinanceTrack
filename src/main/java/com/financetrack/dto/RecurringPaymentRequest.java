package com.financetrack.dto;

public class RecurringPaymentRequest {
    private String name;
    private long amount;
    private int dayMonth;
    private int categoryId;

    public String getName() {
        return name;
    }

    public long getAmount() {
        return amount;
    }

    public int getDayMonth() {
        return dayMonth;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public void setDayMonth(int dayMonth) {
        this.dayMonth = dayMonth;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}