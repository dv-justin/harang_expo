import { theme } from "@/constants/Theme";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const handleBackClickButton = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackClickButton}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </Pressable>
      <Text style={[styles.title, styles.subColor]}>{title}</Text>

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingTop: responsiveHeight(4),
    paddingBottom: responsiveHeight(4),
    justifyContent: "space-between",
    alignItems: "center",
  },
  backImage: {
    width: 20,
    height: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 22,
    paddingHorizontal: 12,
  },
  subColor: {
    color: theme.colors.primaryText,
  },
});
