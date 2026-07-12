package com.financetrack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int id;

    //Otros atributos
    @Column(name = "name", nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean active = true;

    //Relaciones
    //Un usuario tiene multiples categorias de gastos
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
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

    //Getters y setters
    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setActive(boolean active) { this.active = active; }
    public void setUser(User user) { this.user = user; }

    public int getId() { return this.id; }
    public String getName() { return this.name; }
    public boolean isActive() { return this.active; }
    public User getUser() { return this.user; }
}