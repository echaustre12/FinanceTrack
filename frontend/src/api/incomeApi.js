import { apiFetch } from "./client";

export function getIncomes() {
  return apiFetch("/api/incomes");
}

export function createIncome(
  income
) {
  return apiFetch(
    "/api/incomes",
    {
      method: "POST",
      body: JSON.stringify(income)
    }
  );
}