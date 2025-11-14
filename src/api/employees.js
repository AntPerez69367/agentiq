import apiClient from "./client";

export const employeesApi = {
  getAll: (params) =>
    apiClient(`/employees?page=${params.page}&size=${params.size}`),
  getById: (id) => apiClient(`/employees/${id}`),
  create: (data) =>
    apiClient("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiClient(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiClient(`/employees/${id}`, {
      method: "DELETE",
    }),
};
