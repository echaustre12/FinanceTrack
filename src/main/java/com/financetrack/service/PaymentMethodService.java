package com.financetrack.service;

import com.financetrack.dto.PaymentMethodRequest;
import com.financetrack.model.PaymentMethod;
import com.financetrack.model.User;
import com.financetrack.repository.PaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PaymentMethodService {


    private final PaymentMethodRepository paymentMethodRepository;



    public List<PaymentMethod> getPaymentMethods(User user){

        return paymentMethodRepository.findByUser(user);

    }



    public PaymentMethod createPaymentMethod(
            User user,
            PaymentMethodRequest request
    ){

        PaymentMethod paymentMethod = new PaymentMethod();

        paymentMethod.setName(request.getName());
        paymentMethod.setUser(user);


        return paymentMethodRepository.save(paymentMethod);
    }



    public void deletePaymentMethod(
            User user,
            Integer id
    ){

        PaymentMethod paymentMethod =
                paymentMethodRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Método de pago no encontrado"
                        )
                );


        if(paymentMethod.getUser().getId() != user.getId()){
            throw new RuntimeException(
                    "No tienes permiso para eliminar este método"
            );
        }


        paymentMethodRepository.delete(paymentMethod);
    }
}