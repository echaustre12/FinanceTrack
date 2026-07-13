package com.financetrack.service;

import com.financetrack.model.Category;
import com.financetrack.model.RecurringPayment;
import com.financetrack.dto.RecurringPaymentRequest;
import com.financetrack.dto.RecurringPaymentResponse;
import com.financetrack.model.User;
import com.financetrack.repository.CategoryRepository;
import com.financetrack.repository.RecurringPaymentRepository;
import com.financetrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecurringPaymentService {

    private final RecurringPaymentRepository recurringRepository;
    private final CategoryRepository categoryRepository;

    public RecurringPaymentService(
            RecurringPaymentRepository recurringRepository,
            CategoryRepository categoryRepository
    ) {
        this.recurringRepository = recurringRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<RecurringPaymentResponse>
    findAll(User user) {

        return recurringRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public RecurringPaymentResponse create(
            RecurringPaymentRequest request,
            User user
    ) {

        Category category =
                categoryRepository
                        .findByIdAndUserId(
                                request.getCategoryId(),
                                user.getId()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Categoría no encontrada."
                                        )
                        );

        if (!category.isActive()) {
            throw new RuntimeException(
                    "La categoría está inactiva."
            );
        }

        if (request.getDayMonth() < 1
                || request.getDayMonth() > 31) {
            throw new RuntimeException(
                    "El día debe estar entre 1 y 31."
            );
        }

        RecurringPayment payment =
                new RecurringPayment();

        payment.setName(request.getName());
        payment.setAmount(request.getAmount());
        payment.setDayMonth(
                request.getDayMonth()
        );
        payment.setCategory(category);
        payment.setUser(user);

        recurringRepository.save(payment);

        return toResponse(payment);
    }

    public void delete(
            int id,
            User user
    ) {

        RecurringPayment payment =
                recurringRepository
                        .findByIdAndUserId(
                                id,
                                user.getId()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Pago recurrente no encontrado."
                                        )
                        );

        recurringRepository.delete(payment);
    }

    private RecurringPaymentResponse
    toResponse(
            RecurringPayment p
    ) {
        return new RecurringPaymentResponse(
                p.getId(),
                p.getName(),
                p.getAmount(),
                p.getDayMonth(),
                p.getCategory().getId()
        );
    }
}