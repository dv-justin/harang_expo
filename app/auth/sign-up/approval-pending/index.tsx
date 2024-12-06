import { theme } from "@/constants/Theme";
import React from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function ApprovalPending() {
  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text style={styles.title}>하랑 매니저가</Text>
        <Text style={styles.title}>심사중이에요!</Text>
      </View>
      <Image
        style={styles.loading}
        source={require("@/assets/images/sign-up/loading.png")}
      />
      <View style={styles.alarmTitleGroup}>
        <Text style={styles.alarmTitle}>심사 완료 시</Text>
        <Text style={styles.alarmTitle}>알림과 알림톡으로</Text>
        <Text style={styles.alarmTitle}>알려드릴게요!</Text>
      </View>
      <View style={styles.timeTitleGroup}>
        <Text style={styles.timeTitle}>최대 24시간</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    margin: responsiveWidth(24),
    marginHorizontal: responsiveHeight(4),
  },

  loading: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
  },

  titleGroup: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: responsiveHeight(6),
  },

  title: {
    fontSize: responsiveWidth(6),
    fontWeight: "700",
    color: theme.colors.primary,
  },

  alarmTitleGroup: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: responsiveHeight(8),
  },

  alarmTitle: {
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    color: theme.colors.primaryText,
    paddingTop: responsiveWidth(2),
  },

  timeTitleGroup: {
    paddingTop: responsiveWidth(10),
    paddingBottom: responsiveHeight(6),
  },

  timeTitle: {
    fontSize: responsiveWidth(5.4),
    fontWeight: "700",
    color: theme.colors.sub,
  },
});
