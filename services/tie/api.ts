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

export const updateTieAfter = async (
  tieId: number,
  data: { user_after: boolean }
) => {
  try {
    const response = await apiClient.patch(`/ties/${tieId}/after`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};
