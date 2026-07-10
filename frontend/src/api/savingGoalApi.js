import { apiFetch } from "./client";

export function getSavingGoals() {
  return apiFetch("/api/savings");
}

export function createSavingGoal(
  savingGoal
) {
  return apiFetch(
    "/api/savings",
    {
      method: "POST",
      body: JSON.stringify(
        savingGoal
      )
    }
  );
}