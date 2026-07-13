package com.financetrack.dto;

public class RecurringPaymentResponse {

    private int id;
    private String name;
    private long amount;
    private int dayMonth;
    private int categoryId;

    public RecurringPaymentResponse(int id, String name, long amount, int dayMonth, int categoryId) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.dayMonth = dayMonth;
        this.categoryId = categoryId;
    }

    public int getId() {
        return id;
    }

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
}