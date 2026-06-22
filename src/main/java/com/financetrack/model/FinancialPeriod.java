package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "financial_period")
public class FinancialPeriod {
    //Atributos relacionados a la clase FinancialPeriod
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    //Otros atributos
    @Column(name = "year", nullable = false)
    private int year;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "status", nullable = false)
    private boolean status;

    //Relaciones
    //Un usuario tiene multiples periodos financieros
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //Un periodo financiero tiene multiples gastos
    @OneToMany(mappedBy = "financialPeriod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

    //Un periodo financiero tiene multiples ingresos
    @OneToMany(mappedBy = "financialPeriod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Income> incomes;

    //Un periodo financiero tiene multiples presupuestos de categoria
    @OneToMany(mappedBy = "financialPeriod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryBudget> categoryBudgets;

}