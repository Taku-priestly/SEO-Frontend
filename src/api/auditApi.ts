import { api } from "./axios";

export const startAudit = async (
  payload: {
    url: string;
    keyword: string;
  }
) => {

  const response =
    await api.post(
      "/audit/start",
      payload
    );

  return response.data;
};

export const getAuditStatus =
async (auditId: string) => {

  const response =
    await api.get(
      `/audit/${auditId}`
    );

  return response.data;
};

export const refreshAudit = async (
  auditId: string
) => {
  const response =
    await api.post(
      `/audit/${auditId}/refresh`
    );
  return response.data;
};
