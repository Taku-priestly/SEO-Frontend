import { api } from "./axios";

export const getCompetitors = async (
  auditId: string
) => {

  const response =
    await api.get(
      `/analysis/${auditId}`
    );

  return response.data;
};
