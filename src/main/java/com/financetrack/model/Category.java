package com.financetrack.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    //Atributos relacionados a la clase category
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    //Otros atributos
    @Column(name = "name", nullable = false)
    private String name;

    //Relaciones
    //Un usuario tiene multiples categorias de gastos
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //Una categoria tiene multiples gastos
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

    //Una categoria tiene multiples pagos recurrentes
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecurringPayment> recurringPayments;

    //Una categoria puede tener distintos presupuestos
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryBudget> categoryBudgets;

}