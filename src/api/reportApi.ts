import { api } from "./axios";

export const getReport = async (auditId: string) => {
  const response = await api.get(`/reports/${auditId}`);
  return response.data;
};

export const exportReport = async (auditId: string) => {
  const response = await api.post(`/reports/${auditId}/export`);
  return response.data;
};
