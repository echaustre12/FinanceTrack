package com.financetrack.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "saving_goal")
public class SavingGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(name = "target_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal targetAmount;

    @Column(name = "current_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal currentAmount = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(
            mappedBy = "savingGoal",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SavingContribution> contributions = new ArrayList<>();

    public SavingGoal() {
    }

    public SavingGoal(String name, BigDecimal targetAmount, User user) {
        this.name = name;
        this.targetAmount = targetAmount;
        this.user = user;
        this.currentAmount = BigDecimal.ZERO;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public BigDecimal getTargetAmount() {
        return targetAmount;
    }
    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }
    public BigDecimal getCurrentAmount() {
        return currentAmount;
    }
    public void setCurrentAmount(BigDecimal currentAmount) {
        this.currentAmount = currentAmount;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<SavingContribution> getContributions() {
        return contributions;
    }
    public void setContributions(List<SavingContribution> contributions) {
        this.contributions = contributions;
    }
}