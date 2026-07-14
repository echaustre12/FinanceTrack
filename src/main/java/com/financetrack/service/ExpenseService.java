package com.financetrack.service;

import com.financetrack.dto.ExpenseRequest;
import com.financetrack.dto.ExpenseResponse;
import com.financetrack.model.Category;
import com.financetrack.model.Expense;
import com.financetrack.model.FinancialPeriod;
import com.financetrack.model.PaymentMethod;
import com.financetrack.model.User;
import com.financetrack.repository.CategoryRepository;
import com.financetrack.repository.ExpenseRepository;
import com.financetrack.repository.PaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    private final CategoryRepository categoryRepository;

    private final PaymentMethodRepository paymentMethodRepository;

    private final FinancialPeriodService financialPeriodService;

    public List<ExpenseResponse> getAll(User user) {

        FinancialPeriod period =
                financialPeriodService.ensureActivePeriod(user);

        return expenseRepository
                .findByFinancialPeriod(period)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ExpenseResponse getById(
            int id,
            User user
    ) {

        return toResponse(findExpense(id, user));

    }

    public ExpenseResponse create(
            ExpenseRequest request,
            User user
    ) {

        FinancialPeriod period =
                financialPeriodService.ensureActivePeriod(user);

        Category category =
                categoryRepository
                        .findById(request.getCategoryId())
                        .orElseThrow(() ->
                                new IllegalArgumentException("Categoría no encontrada."));

        PaymentMethod paymentMethod =
                paymentMethodRepository
                        .findById(request.getPaymentMethodId())
                        .orElseThrow(() ->
                                new IllegalArgumentException("Método de pago no encontrado."));

        Expense expense = new Expense();

        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setCategory(category);
        expense.setPaymentMethod(paymentMethod);
        expense.setFinancialPeriod(period);

        return toResponse(
                expenseRepository.save(expense)
        );
    }

    public ExpenseResponse update(
            int id,
            ExpenseRequest request,
            User user
    ) {

        Expense expense =
                findExpense(id, user);

        Category category =
                categoryRepository
                        .findById(request.getCategoryId())
                        .orElseThrow(() ->
                                new IllegalArgumentException("Categoría no encontrada."));

        PaymentMethod paymentMethod =
                paymentMethodRepository
                        .findById(request.getPaymentMethodId())
                        .orElseThrow(() ->
                                new IllegalArgumentException("Método de pago no encontrado."));

        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setCategory(category);
        expense.setPaymentMethod(paymentMethod);

        return toResponse(
                expenseRepository.save(expense)
        );
    }

    public void delete(
            int id,
            User user
    ) {

        Expense expense =
                findExpense(id, user);

        expenseRepository.delete(expense);

    }

    private Expense findExpense(
            int id,
            User user
    ) {

        Expense expense =
                expenseRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException("Gasto no encontrado."));

        if (expense.getFinancialPeriod()
                .getUser()
                .getId() != user.getId()) {

            throw new IllegalArgumentException(
                    "No tienes acceso a este gasto."
            );
        }

        return expense;
    }

    private ExpenseResponse toResponse(
            Expense expense
    ) {

        return new ExpenseResponse(

                expense.getId(),

                expense.getAmount(),

                expense.getDescription(),

                expense.getDate(),

                expense.getPaymentMethod().getId(),

                expense.getPaymentMethod().getName(),

                expense.getCategory().getId(),

                expense.getCategory().getName(),

                expense.getFinancialPeriod().getId()

        );

    }

}