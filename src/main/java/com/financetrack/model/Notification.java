package com.financetrack.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "notification")
public class Notification {
    //Atributos relacionados a la clase Notification
    //Llave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //Otros Atributos
    @Column(name = "message", nullable = false)
    private String message;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date", nullable = false)
    private LocalDate date;

    //Relaciones
    //Un usuario tiene multiples notificaciones
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}