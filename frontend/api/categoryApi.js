import { apiFetch } from "./client";

export function getCategories() {
  return apiFetch("/api/categories");
}

export function createCategory(
  category
) {
  return apiFetch(
    "/api/categories",
    {
      method: "POST",
      body: JSON.stringify(category)
    }
  );
}

export function deleteCategory(id) {
  return apiFetch(
    `/api/categories/${id}`,
    {
      method: "DELETE"
    }
  );
}