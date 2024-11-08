import { theme } from "@/constants/Theme";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface PageTitleProps {
  title01: string;
  title02: string;
}

export default function PageTitle({ title01, title02 }: PageTitleProps) {
  const handleBackClickButton = () => {
    router.back();
  };
  return (
    <View>
      <Pressable style={styles.header} onPress={handleBackClickButton}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </Pressable>
      <Text style={[styles.title, styles.subColor]}>{title01}</Text>
      <Text style={styles.title}>{title02}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: responsiveHeight(4),
  },
  backImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(6),
    paddingVertical: 4,
  },

  subColor: {
    color: theme.colors.primary,
  },
});
