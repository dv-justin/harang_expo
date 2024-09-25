import { theme } from "@/constants/Theme";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface PageTitleProps {
  title01: string;
  title02: string;
}

export default function PageTitle({ title01, title02 }: PageTitleProps) {
  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </View>
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
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(8),
    paddingVertical: 4,
  },

  subColor: {
    color: theme.colors.sub,
  },
});
