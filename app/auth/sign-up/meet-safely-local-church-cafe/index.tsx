import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/common/components/Button";
import { useRouter } from "expo-router";
import { theme } from "@/constants/Theme";

export default function MeetSafelyLocalChurchCafe() {
  const router = useRouter();

  const buttonClick = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text>
        <Text style={[styles.title, styles.mainColor]}>지역 교회 카페</Text>
        <Text style={[styles.title, styles.subColor]}>에서</Text>
      </Text>
      <Text>
        <Text style={[styles.title, styles.mainColor]}>안전한 만남</Text>
        <Text style={[styles.title, styles.subColor]}>이 진행되요!</Text>
      </Text>
      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="다음" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
    marginTop: responsiveHeight(4),
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(6.4),
    paddingVertical: 4,
  },

  mainColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(68),
  },
});
