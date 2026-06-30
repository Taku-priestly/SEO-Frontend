import { api } from "./axios";

export interface UserProfile {
  firebaseUid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateProfile = async (data: { name?: string; picture?: string }): Promise<UserProfile> => {
  const response = await api.put("/users/me", data);
  return response.data;
};
