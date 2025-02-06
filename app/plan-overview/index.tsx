import Button from "@/components/Button";
import { theme } from "@/constants/Theme";
import { refreshAccessToken } from "@/services/auth/api";
import { getRefreshToken, setAccessToken } from "@/services/auth/auth";
import { getTieMeeting } from "@/services/tie/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export interface Meeting {
  meetingAddress: string;
  meetingLocation: string;
  meetingSchedule: string;
}

export default function PlanOverview() {
  const { id } = useLocalSearchParams();
  const [meeting, setMeeting] = useState<Meeting>();
  const handleBackClickButton = () => {
    router.back();
  };

  const handleButton = () => {
    router.push("/plan-overview/meeting-guide");
  };

  async function handleUnauthorizedError(error: any) {
    if (error.status === 401) {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        try {
          const { access_token: accessToken } = await refreshAccessToken(
            refreshToken
          );
          await setAccessToken(accessToken);
          await fetchData();
        } catch (refreshError: any) {
          router.replace("/auth");
        }
        return;
      }

      router.replace("/auth");
    }
    router.replace("/error");
  }

  const fetchData = async () => {
    try {
      const meetingValue = await getTieMeeting(Number(id));

      if (meetingValue) {
        setMeeting(meetingValue);
      }
    } catch (error: any) {
      handleUnauthorizedError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackClickButton}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </Pressable>
      <Text style={styles.planTitle}>만남 일정</Text>
      <View style={styles.planGroup}>
        <Text style={styles.planContent}>일시: {meeting?.meetingSchedule}</Text>
        <Text style={styles.planContent}>장소: {meeting?.meetingLocation}</Text>
        <Text style={styles.planContent}>주소: {meeting?.meetingAddress}</Text>
      </View>
      <View style={styles.locationGroup}>
        <Text style={styles.planTitle}>만남 위치</Text>
        <Text style={styles.locationText}>
          하단 사진의 만남 위치를 꼭 확인해주세요!
        </Text>
        <View style={styles.locationImageGroup}>
          <Image
            style={styles.locationImage}
            source={require("@/assets/images/location.png")}
          ></Image>
        </View>
      </View>
      <Pressable style={styles.meetingGuideButtonGroup} onPress={handleButton}>
        <Text style={styles.meetingGuideButtonTitle}>만남 가이드 확인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    paddingVertical: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: theme.colors.background,
  },
  backImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginBottom: 24,
  },
  planGroup: {
    backgroundColor: theme.colors.primaryRgb,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: responsiveHeight(1),
  },

  planTitle: {
    fontSize: 20,
    color: theme.colors.primaryText,
    fontWeight: "700",
  },

  planContent: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "700",
    paddingTop: 2,
  },

  locationGroup: {
    marginTop: responsiveHeight(4),
  },

  locationText: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 14,
    color: theme.colors.subText,
    fontWeight: "700",
  },

  locationImageGroup: {
    marginTop: responsiveHeight(2),
  },
  locationImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(38),
    borderRadius: 10,
  },

  meetingGuideButtonGroup: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(90),
    height: 48,
    backgroundColor: theme.colors.primary,
    marginTop: responsiveHeight(4),
    borderRadius: 10,
  },

  meetingGuideButtonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.white,
  },
});
