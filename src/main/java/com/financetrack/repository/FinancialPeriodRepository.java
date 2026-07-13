package com.financetrack.repository;

import com.financetrack.model.FinancialPeriod;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FinancialPeriodRepository
        extends JpaRepository<FinancialPeriod, Integer> {

    Optional<FinancialPeriod> findByUserAndStatusTrue(User user);

    List<FinancialPeriod> findByUser(User user);

    Optional<FinancialPeriod> findByUserAndStartDate(
            User user,
            LocalDate startDate
    );
}