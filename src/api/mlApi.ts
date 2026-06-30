import { api } from "./axios";

export const getMLResults = async (
  auditId: string
) => {

  const response =
    await api.get(
      `/ml-results/${auditId}`
    );

  return response.data;
};