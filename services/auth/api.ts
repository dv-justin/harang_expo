import { User } from "@/atoms/user/userAtom";
import apiClient from "../api.client";

export const getUserInfo = async (
  phoneNumber: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  status: string;
} | null> => {
  try {
    const response = await apiClient.get(`/auth/phone-number/${phoneNumber}`);

    if (response?.data) {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        status,
      } = response.data;

      return {
        accessToken,
        refreshToken,
        status,
      };
    }

    return null;
  } catch (error) {
    throw error;
  }
};

export const getUserInfoAccessToken = async (
  accessToken: string
): Promise<any> => {
  try {
    const response = await apiClient.get(`/users/${accessToken}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  user: User
): Promise<{
  access_token: string;
  refresh_token: string;
}> => {
  try {
    const {
      birthDate,
      name,
      phoneNumber,
      regionLevel1,
      regionLevel2,
      churchName,
      pastorName,
      churchRegionName,
      schoolAndMajor,
      companyName,
      yourFaith,
      influentialVerse,
      prayerTopic,
      vision,
      coupleActivity,
      expectedMeeting,
      merit,
      idealTypeAge,
      idealTypeDistance,
    } = user;

    const serverUser = {
      name: name,
      birthdate: birthDate,
      phone_number: phoneNumber,
      region_level1: regionLevel1,
      region_level2: regionLevel2,
      church_name: churchName,
      pastor_name: pastorName,
      church_region_name: churchRegionName,
      school_and_major: schoolAndMajor,
      company_name: companyName,
      your_faith: yourFaith,
      influential_verse: influentialVerse,
      prayer_topic: prayerTopic,
      vision: vision,
      couple_activity: coupleActivity,
      expected_meeting: expectedMeeting,
      merit: merit,
      ideal_type_age: idealTypeAge,
      ideal_type_distance: idealTypeDistance,
    };

    const response = await apiClient.post(
      "/auth",
      {
        ...serverUser,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.get(`/auth/${refreshToken}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
