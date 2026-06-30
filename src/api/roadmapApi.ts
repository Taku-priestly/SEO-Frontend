import { api } from "./axios";

export const getRoadmap = async (
 auditId:string
) => {

 const response =
 await api.get(
  `/roadmap/${auditId}`
 );

 return response.data;

};