import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface ButtonProps {
  title: string;
}

export default function AuthCompleteButton({ title }: ButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: responsiveHeight(3),
    paddingVertical: responsiveWidth(2),
    borderRadius: 15,
  },

  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
