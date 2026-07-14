package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;


import java.time.LocalDate;

@Entity
@Table(name = "income")
public class Income {
    //Atributos relacionados a la clase Income
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //Otros Atributos
    @Column(name = "amount", nullable = false)
    private long amount;

    @Column(name = "description")
    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date", nullable = false)
    private LocalDate date;

    //Relaciones
    //Un ingreso tiene solo un periodo financiero
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "period_id", nullable = false)
    private FinancialPeriod financialPeriod;

    //Un ingreso tiene solo un metodo de pago
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    public Income() {
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

    public FinancialPeriod getFinancialPeriod() {
        return financialPeriod;
    }

    public void setFinancialPeriod(FinancialPeriod financialPeriod) {
        this.financialPeriod = financialPeriod;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}