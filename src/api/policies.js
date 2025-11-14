import apiClient from "./client";

export const policiesApi = {
  getAll: (params) =>
    apiClient(`/policies?page=${params.page}&size=${params.size}`),
  getById: (id) => apiClient(`/policies/${id}`),
  create: (data) =>
    apiClient("/policies", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiClient(`/policies/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiClient(`/policies/${id}`, {
      method: "DELETE",
    }),
};
