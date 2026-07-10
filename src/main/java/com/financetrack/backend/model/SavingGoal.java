package com.financetrack.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "saving_goal")
public class SavingGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "target_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal targetAmount;

    @Column(name = "current_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal currentAmount = BigDecimal.ZERO;

    // Muchas metas pertenecen a un usuario
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Una meta tiene muchas consignaciones
    @OneToMany(mappedBy = "savingGoal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavingContribution> contributions;
}