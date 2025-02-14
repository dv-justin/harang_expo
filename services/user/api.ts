import { User } from "@/atoms/user/userAtom";
import apiClient from "../api.client";

export const getUserId = async (userId: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}?include_match=true`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserIdToken = async () => {
  try {
    const response = await apiClient.get(`/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    const {
      birthDate,
      name,
      gender,
      phoneNumber,
      regionLevel1,
      regionLevel2,
      churchName,
      pastorName,
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
      gender: gender,
      phone_number: phoneNumber,
      region_level1: regionLevel1,
      region_level2: regionLevel2,
      church_name: churchName,
      pastor_name: pastorName,
      school_and_major: schoolAndMajor,
      company_name: companyName,
      your_faith: yourFaith,
      influential_verse: influentialVerse,
      prayer_topic: prayerTopic,
      vision: vision,
      couple_activity: coupleActivity,
      expected_meeting: expectedMeeting,
      merit: merit,
    };

    const response = await apiClient.patch(
      `/users`,
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
