package com.financetrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recurring_payment")
public class RecurringPayment {
    //Atributos relacionados a la clase RecurringPayment
    //Llave Primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Otros Atributos
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "amount", nullable = false)
    private long amount;

    @Column(name = "day_month", nullable = false)
    private int dayMonth;

    //Relaciones
    //Una categoria tiene multiples pagos recurrentes
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    //Un usuario tiene multiples pagos recurrentes
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}