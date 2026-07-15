package com.financetrack.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class IncomeResponse {
    private int id;
    private long amount;
    private String description;
    private LocalDate date;
    private int paymentMethodId;
    private int financialPeriodId;

    public void setAmount(long amount) {this.amount = amount; }
    public void setDescription(String description) {this.description = description; }
    public void setDate(LocalDate date) {this.date = date; }
    public void setPaymentMethodId(int paymentMethodId) {this.paymentMethodId = paymentMethodId; }
    public void setFinancialPeriodId(int financialPeriodId) {this.financialPeriodId = financialPeriodId; }

    public long getAmount() { return amount; }
    public String getDescription() { return description; }
    public LocalDate getDate() { return date; }
    public int getPaymentMethodId() { return paymentMethodId; }
    public int getFinancialPeriodId() { return financialPeriodId; }
}