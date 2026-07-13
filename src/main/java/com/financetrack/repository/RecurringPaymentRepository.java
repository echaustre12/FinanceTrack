package com.financetrack.repository;

import com.financetrack.model.RecurringPayment;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecurringPaymentRepository extends JpaRepository<RecurringPayment, Integer> {
    List<RecurringPayment> findByUserId(int userId);
    Optional<RecurringPayment> findByIdAndUserId(int id, int userId);
}