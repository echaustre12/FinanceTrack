package com.financetrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recurring_payment")
public class RecurringPayment {
    //Atributos relacionados a la clase RecurringPayment
    //Llave Primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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

    //Constructor
    public RecurringPayment() {
    }

    //Getters y setters
    public int getId() { return id; }
    public String getName() { return name; }
    public long getAmount() { return amount; }
    public int getDayMonth() { return dayMonth; }
    public Category getCategory() { return category; }
    public User getUser() { return user; }

    public void setName(String name) { this.name = name; }
    public void setAmount(long amount) { this.amount = amount; }
    public void setDayMonth(int dayMonth) { this.dayMonth = dayMonth; }
    public void setCategory(Category category) { this.category = category; }
    public void setUser(User user) { this.user = user; }
}