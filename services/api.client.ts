import axios from "axios";
import { getAccessToken } from "./auth/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "*/*",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes("/auth")) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
