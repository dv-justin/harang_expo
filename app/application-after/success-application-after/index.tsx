import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function SuccessApplicationAfter() {
  return (
    <View style={styles.container}>
      <PageTitle title01="상대방 연락처" title02="확인부탁드려요!" />

      <Text style={styles.subTitle}>주님안에서의 좋은 사랑 응원합니다!</Text>

      <View style={styles.phoneNumberInfoGroup}>
        <Text style={styles.phoneNumberInfoText}>연락처: 010343240242</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primaryRgb,
    paddingTop: 4,
  },

  phoneNumberInfoGroup: {
    width: responsiveWidth(80),
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.sub,
    borderRadius: 10,
    marginTop: responsiveHeight(6),
  },
  phoneNumberInfoText: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.white,
  },
});
