package com.financetrack.repository;

import com.financetrack.model.Expense;
import com.financetrack.model.FinancialPeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense,Integer> {

    List<Expense> findByFinancialPeriod(FinancialPeriod financialPeriod);
    Optional<Expense> findById(int id);

}