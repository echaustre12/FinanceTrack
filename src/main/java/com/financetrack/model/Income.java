package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "income")
public class Income {
    //Atributos relacionados a la clase Income
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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
    @JoinColumn(name = "period_id", nullable = false)
    private FinancialPeriod financialPeriod;

    //Un ingreso tiene solo un metodo de pago
    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;
}