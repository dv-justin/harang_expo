import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.bannerGroup}>
          <Text style={[styles.title, styles.primaryColor]}>새로운 여정</Text>
          <Text style={[styles.title, styles.subColor]}>친구와 함께</Text>
        </View>
        <View style={styles.logo}>
          <Text style={[styles.logoTitle, styles.primaryColor]}>시</Text>
          <Text style={[styles.logoTitle, styles.subColor]}>소</Text>
        </View>
      </View>
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
    alignItems: "center",
    marginTop: responsiveHeight(20),
  },
  logo: {
    marginTop: responsiveHeight(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: responsiveWidth(16),
    fontWeight: "bold",
  },
  title: {
    fontSize: responsiveWidth(7),
    fontWeight: "800",
    color: theme.colors.primaryText,
  },
  primaryColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.sub,
  },
});
