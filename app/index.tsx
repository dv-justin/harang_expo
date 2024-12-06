import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { getAccessToken } from "@/services/auth/auth";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = await getAccessToken();
        router.push(`/${accessToken ? "(tabs)" : "auth"}`);
      } catch (error) {
        router.push("/auth");
      }
    };

    checkAuthentication();
  }, [router]);
  return (
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
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
  logo: {
    marginTop: responsiveHeight(40),
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
  primaryColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },
});
