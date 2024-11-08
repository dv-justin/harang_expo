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
          <Text style={[styles.title, styles.subColor]}>하나님을 바라보는</Text>
          <Text style={[styles.title, styles.subColor]}>인연을 만나려면?</Text>
        </View>
        <View style={styles.logo}>
          <Text style={[styles.logoSubTitle]}>하나님안에서의 사랑</Text>
          <Text style={[styles.logoTitle, styles.primaryColor]}>하랑</Text>
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
    marginTop: responsiveHeight(14),
  },
  logo: {
    marginTop: responsiveHeight(18),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: responsiveWidth(14),
    fontWeight: "bold",
  },
  logoSubTitle: {
    fontSize: responsiveWidth(4),
    fontWeight: "bold",
    color: "#FF9EAA",
  },
  title: {
    fontSize: responsiveWidth(6),
    fontWeight: "800",
    color: theme.colors.primaryText,
  },
  primaryColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },
});
