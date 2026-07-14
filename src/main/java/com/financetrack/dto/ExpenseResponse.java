package com.financetrack.dto;

import java.time.LocalDate;

public class ExpenseResponse {

    private int id;

    private long amount;

    private String description;

    private LocalDate date;

    private int paymentMethodId;

    private String paymentMethodName;

    private int categoryId;

    private String categoryName;

    private int financialPeriodId;

    public ExpenseResponse() {
    }

    public ExpenseResponse(
            int id,
            long amount,
            String description,
            LocalDate date,
            int paymentMethodId,
            String paymentMethodName,
            int categoryId,
            String categoryName,
            int financialPeriodId
    ) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.paymentMethodId = paymentMethodId;
        this.paymentMethodName = paymentMethodName;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.financialPeriodId = financialPeriodId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(int paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public String getPaymentMethodName() {
        return paymentMethodName;
    }

    public void setPaymentMethodName(String paymentMethodName) {
        this.paymentMethodName = paymentMethodName;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getFinancialPeriodId() {
        return financialPeriodId;
    }

    public void setFinancialPeriodId(int financialPeriodId) {
        this.financialPeriodId = financialPeriodId;
    }

}