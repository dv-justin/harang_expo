import { theme } from "@/constants/Theme";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface SubTitleProps {
  title01: string;
  title02: string;
}

export default function SubTitle({ title01, title02 }: SubTitleProps) {
  return (
    <View>
      <Text style={[styles.title]}>{title01}</Text>
      <Text style={styles.title}>{title02}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.subText,
  },
});
