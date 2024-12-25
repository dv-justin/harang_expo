import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function Auth() {
  const router = useRouter();

  const buttonClick = () => {
    router.push("/auth/sign-up");
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerGroup}>
        <Text style={[styles.bannerTitle, styles.subColor]}>
          하나님을 바라보는
        </Text>
        <Text style={[styles.bannerTitle, styles.subColor]}>
          인연을 만나려면?
        </Text>
      </View>
      <View style={styles.logo}>
        <Text style={[styles.logoSubTitle]}>하나님안에서의 사랑</Text>
        <Text style={[styles.logoTitle, styles.primaryColor]}>하랑</Text>
      </View>
      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="휴대폰번호로 시작하기" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  bannerGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(14),
  },

  bannerTitle: {
    fontSize: responsiveWidth(6),
    fontWeight: "bold",
  },

  logo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(20),
  },

  logoImage: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },

  logoTitle: {
    fontSize: responsiveWidth(14),
    fontWeight: "bold",
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(24),
  },

  primaryColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },

  logoSubTitle: {
    fontSize: responsiveWidth(4),
    color: theme.colors.sub,
    fontWeight: "700",
  },
});
