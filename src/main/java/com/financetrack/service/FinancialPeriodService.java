package com.financetrack.service;

import com.financetrack.model.FinancialPeriod;
import com.financetrack.model.User;
import com.financetrack.repository.FinancialPeriodRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FinancialPeriodService {

    private final FinancialPeriodRepository financialPeriodRepository;

    public FinancialPeriodService(
            FinancialPeriodRepository financialPeriodRepository
    ) {
        this.financialPeriodRepository = financialPeriodRepository;
    }

    public List<FinancialPeriod> getAll(User user) {
        return financialPeriodRepository.findByUser(user);
    }

    public FinancialPeriod getActivePeriod(User user) {
        return financialPeriodRepository
                .findByUserAndStatusTrue(user)
                .orElse(null);
    }

    public FinancialPeriod createCurrentPeriod(User user) {

        LocalDate today = LocalDate.now();

        LocalDate start =
                today.withDayOfMonth(1);

        LocalDate end =
                start.plusMonths(1).minusDays(1);

        Optional<FinancialPeriod> existing =
                financialPeriodRepository
                        .findByUserAndStartDate(
                                user,
                                start
                        );

        if (existing.isPresent()) {
            return existing.get();
        }

        FinancialPeriod period =
                new FinancialPeriod();

        period.setYear(start.getYear());
        period.setStartDate(start);
        period.setEndDate(end);
        period.setStatus(true);
        period.setUser(user);

        return financialPeriodRepository.save(period);
    }

    public FinancialPeriod ensureActivePeriod(User user) {

        FinancialPeriod active =
                getActivePeriod(user);

        LocalDate today = LocalDate.now();

        LocalDate currentMonth =
                today.withDayOfMonth(1);

        if (active == null) {
            return createCurrentPeriod(user);
        }

        if (!active.getStartDate()
                .equals(currentMonth)) {

            active.setStatus(false);

            financialPeriodRepository.save(active);

            return createCurrentPeriod(user);
        }

        return active;
    }
}