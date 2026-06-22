package com.financetrack.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "payment_method")
public class PaymentMethod {
    //Atributos relacionados a la clase PaymentMethod
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Otros Atributos
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    //Relaciones
    @OneToMany(mappedBy = "paymentMethod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Income> incomes;

    @OneToMany(mappedBy = "paymentMethod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

}