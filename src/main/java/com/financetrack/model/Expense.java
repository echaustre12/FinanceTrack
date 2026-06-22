package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "expense")
public class Expense {
    //Atributos relacionados a la clase Expense
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Otros atributos
    @Column(name = "amount", nullable = false)
    private long amount;

    @Column(name = "description")
    private String descripition;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date", nullable = false)
    private LocalDate date;

    //Relaciones
    //Un gasto tiene un solo metodo de pago
    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    //Un gasto tiene una sola categoria
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    //Un gasto tiene un solo periodo financiero
    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private FinancialPeriod financialPeriod;
}