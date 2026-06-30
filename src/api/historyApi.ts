import { api } from "./axios";

export const getAuditHistory =
async () => {

 const response =
 await api.get(
  "/audit/history"
 );

 return response.data;
};