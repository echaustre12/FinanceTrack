package com.financetrack.repository;

import com.financetrack.model.PaymentMethod;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

    List<PaymentMethod> findByUser(User user);

    Optional<PaymentMethod> findByUserAndNameIgnoreCase(
            User user,
            String name
    );

    Optional<PaymentMethod> findByIdAndUserId(
            int id,
            int userId
    );

}