import apiClient from "./client";

export const customersApi = {
  getAll: (params) =>
    apiClient(`/customers?page=${params.page}&size=${params.size}`),
  getById: (id) => apiClient(`/customers/${id}`),
  create: (data) =>
    apiClient("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiClient(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiClient(`/customers/${id}`, {
      method: "DELETE",
    }),
};
