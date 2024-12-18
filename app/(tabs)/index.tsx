import { theme } from "@/constants/Theme";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.lookingFor}>
        <Text style={styles.lookingForText}>
          좋은 사람을 매니저가 찾고있어요!
        </Text>
      </View>
      {/* <View style={styles.introductionGroup}>
        <Text style={styles.introductionText}>소개가 도착했어요!</Text>
        <Text style={styles.introductionSubText}>
          48시간 이내로 선택 부탁드려요!
        </Text>
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/profile.png")}
        />
        <View style={styles.infoGroup}>
          <Text style={styles.infoText}>김 * 희</Text>
          <Text style={styles.infoText}>인천광역시 서구</Text>
        </View>
      </View> */}
      <ScrollView style={styles.meetingScheduleGroup}>
        <Text style={styles.meetingScheduleTitle}>만남 일정</Text>
        <View style={styles.meetingScheduleScroll}>
          <View style={styles.meetingSchedule}>
            <Text style={styles.meetingScheduleContentText}>
              장소: 소금밭 카페(수원 빛들로 교회)
            </Text>
            <Text style={styles.meetingScheduleContentText}>
              주소: 인천광역시 부평구 장제로 45
            </Text>
            <Text style={styles.meetingScheduleContentText}>
              일정: 2024년 12월 24일 오후 8시
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primaryRgb30,
    flexDirection: "column",
    paddingLeft: responsiveWidth(5),
    paddingTop: responsiveHeight(4),
  },

  lookingFor: {
    width: responsiveWidth(90),
    height: responsiveHeight(30),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  lookingForText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },

  introductionGroup: {
    width: responsiveWidth(90),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },

  introductionText: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.sub,
    paddingTop: 32,
  },

  introductionSubText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "700",
    paddingTop: 32,
    marginBottom: 8,
  },

  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(40),
    borderRadius: 10,
  },

  infoGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 12,
  },

  infoText: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primaryText,
  },

  meetingScheduleGroup: {
    marginTop: responsiveHeight(4),
  },

  meetingScheduleScroll: {
    height: responsiveHeight(30),
  },

  meetingScheduleTitle: {
    fontSize: responsiveWidth(5.4),
    fontWeight: "700",
    paddingBottom: responsiveHeight(1),
  },

  meetingSchedule: {
    width: responsiveWidth(90),
    padding: 14,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },

  meetingScheduleContentText: {
    fontSize: 14,
    paddingTop: responsiveHeight(0.4),
    color: theme.colors.primaryText,
    fontWeight: "700",
  },
});
