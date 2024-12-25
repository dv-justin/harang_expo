import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "./api";

export const setAuthTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (error: any) {
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    return accessToken;
  } catch (error: any) {
    throw error;
  }
};

export const setAccessToken = async (accessToken: string) => {
  try {
  await AsyncStorage.setItem("accessToken", accessToken);
  } catch (error: any) {
    throw error;
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return refreshToken;
  } catch (error: any) {
    throw error;
  }
};
