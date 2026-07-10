import { apiFetch } from "./client";

export function getExpenses() {
  return apiFetch("/api/expenses");
}

export function createExpense(
  expense
) {
  return apiFetch(
    "/api/expenses",
    {
      method: "POST",
      body: JSON.stringify(expense)
    }
  );
}