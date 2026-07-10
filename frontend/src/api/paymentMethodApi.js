import { apiFetch } from "./client";

export function getPaymentMethods() {
  return apiFetch(
    "/api/payment-methods"
  );
}

export function createPaymentMethod(
  paymentMethod
) {
  return apiFetch(
    "/api/payment-methods",
    {
      method: "POST",
      body: JSON.stringify(
        paymentMethod
      )
    }
  );
}