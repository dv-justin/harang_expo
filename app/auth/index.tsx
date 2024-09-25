import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import Button from "@/common/components/Button";
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
        <Text style={[styles.bannerTitle, styles.primaryColor]}>친구</Text>
        <Text style={[styles.bannerTitle, styles.subColor]}> 만날 땐?</Text>
      </View>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("@/assets/images/logo.png")}
        />
        <Text>
          <Text style={[styles.logoTitle, styles.primaryColor]}>시</Text>
          <Text style={[styles.logoTitle, styles.subColor]}>소</Text>
        </Text>
      </View>
      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="휴대폰으로 시작하기" />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(20),
  },

  bannerTitle: {
    fontSize: responsiveWidth(8),
    fontWeight: "bold",
  },

  logo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(14),
  },

  logoImage: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },

  logoTitle: {
    fontSize: responsiveWidth(16),
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
    color: theme.colors.sub,
  },
});
