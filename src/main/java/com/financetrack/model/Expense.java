package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;

@Entity
@Table(name = "expense")
public class Expense {
    //Atributos relacionados a la clase Expense
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //Otros atributos
    @Column(name = "amount", nullable = false)
    private long amount;

    @Column(name = "description")
    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date", nullable = false)
    private LocalDate date;

    //Relaciones
    //Un gasto tiene un solo metodo de pago
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    //Un gasto tiene una sola categoria
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    //Un gasto tiene un solo periodo financiero
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "period_id", nullable = false)
    private FinancialPeriod financialPeriod;

    public Expense(){}

    public Expense(int id, long amount, String description, LocalDate date, PaymentMethod paymentMethod, Category category, FinancialPeriod financialPeriod){
        this.id=id;
        this.amount=amount;
        this.description=description;
        this.date=date;
        this.paymentMethod=paymentMethod;
        this.category=category;
        this.financialPeriod=financialPeriod;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id=id;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount=amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description=description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date=date;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod=paymentMethod;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category=category;
    }

    public FinancialPeriod getFinancialPeriod() {
        return financialPeriod;
    }

    public void setFinancialPeriod(FinancialPeriod financialPeriod) {
        this.financialPeriod=financialPeriod;
    }
}