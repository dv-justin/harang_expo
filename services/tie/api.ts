import apiClient from "../api.client";

export const getTies = async () => {
  try {
    const response = await apiClient.get(`/ties`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
