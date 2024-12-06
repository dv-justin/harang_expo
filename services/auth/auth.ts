import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAuthTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (e) {
    console.error("토큰 저장 실패:", e);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    return accessToken;
  } catch (e) {
    console.error("토큰 저장 실패:", e);
  }
};
