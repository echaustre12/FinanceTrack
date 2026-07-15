package com.financetrack.repository;

import com.financetrack.model.Income;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Integer> {

    List<Income> findByFinancialPeriodUser(User user);

}