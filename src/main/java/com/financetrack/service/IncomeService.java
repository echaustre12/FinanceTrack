package com.financetrack.service;

import com.financetrack.dto.IncomeRequest;
import com.financetrack.dto.IncomeResponse;
import com.financetrack.model.*;
import com.financetrack.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final FinancialPeriodRepository financialPeriodRepository;


    public List<IncomeResponse> getAll(User user){

        return incomeRepository
                .findByFinancialPeriodUser(user)
                .stream()
                .map(this::map)
                .toList();
    }


    public IncomeResponse create(
            IncomeRequest request,
            User user
    ){

        Income income = new Income();

        income.setAmount(request.getAmount());
        income.setDescription(request.getDescription());
        income.setDate(request.getDate());

        PaymentMethod pm =
                paymentMethodRepository.findById(request.getPaymentMethodId())
                        .orElseThrow();

        FinancialPeriod period =
                financialPeriodRepository.findById(request.getFinancialPeriodId())
                        .orElseThrow();


        income.setPaymentMethod(pm);
        income.setFinancialPeriod(period);


        return map(incomeRepository.save(income));
    }



    public IncomeResponse update(
            int id,
            IncomeRequest request,
            User user
    ){

        Income income =
                incomeRepository.findById(id)
                        .orElseThrow();


        income.setAmount(request.getAmount());
        income.setDescription(request.getDescription());
        income.setDate(request.getDate());


        PaymentMethod pm =
                paymentMethodRepository.findById(request.getPaymentMethodId())
                        .orElseThrow();


        income.setPaymentMethod(pm);


        return map(incomeRepository.save(income));
    }



    public void delete(
            int id,
            User user
    ){

        incomeRepository.deleteById(id);

    }



    private IncomeResponse map(Income income){

        IncomeResponse response = new IncomeResponse();

        response.setId(income.getId());
        response.setAmount(income.getAmount());
        response.setDescription(income.getDescription());
        response.setDate(income.getDate());

        response.setPaymentMethodId(
                income.getPaymentMethod().getId()
        );

        response.setFinancialPeriodId(
                income.getFinancialPeriod().getId()
        );

        return response;
    }
}