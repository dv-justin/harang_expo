import apiClient from "../api.client";

export const getHome = async () => {
  try {
    const response = await apiClient.get("/homes");

    return response.data;
  } catch (error) {
    throw error;
  }
};
