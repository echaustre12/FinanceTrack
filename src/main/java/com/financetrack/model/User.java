package com.financetrack.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    //Atributos relacionados a la clase User
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Otros Atributos
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDate createdAt;

    @Column(name = "phone_number", nullable = false, unique = true, length = 20)
    private String phoneNumber;

    //Relaciones
    //Un usuario recibe muchas notificaciones
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notificationList;

    //Un usuario tiene multiples periodos financieros
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FinancialPeriod> financialPeriodList;

    //Un usuario tiene multiples categorias de pago
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;

    //Un usuario tiene multiples pagos recurrentes
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecurringPayment> recurringPayments;
}