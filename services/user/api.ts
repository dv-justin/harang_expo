import apiClient from "../api.client";

export const getUserId = async (userId: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
