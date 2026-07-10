import { apiFetch } from "./client";

export function login(data) {
  return apiFetch(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}

export function register(data) {
  return apiFetch(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}