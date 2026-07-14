package com.financetrack.dto;

import jakarta.validation.constraints.NotBlank;

public class PaymentMethodRequest {

    @NotBlank(message = "El nombre del método de pago es obligatorio")
    private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}