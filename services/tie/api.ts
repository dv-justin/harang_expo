import apiClient from "../api.client";

export const getTies = async () => {
  try {
    const response = await apiClient.get(`/ties`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTieMeeting = async (tieId: number) => {
  try {
    const response = await apiClient.get(`/ties/${tieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
