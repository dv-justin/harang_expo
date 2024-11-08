import { theme } from "@/constants/Theme";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/common/components/Button";
import { useRouter } from "expo-router";

export default function CertifiedLoveDonation() {
  const router = useRouter();

  const buttonClick = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text>
        <Text style={[styles.title, styles.pinkColor]}>연애 인증시</Text>
      </Text>
      <Text>
        <Text style={[styles.title, styles.subColor]}>매칭 비용 </Text>
        <Text style={[styles.title, styles.mainColor]}>전액 기부 </Text>
        <Text style={[styles.title, styles.subColor]}>됩니다.</Text>
      </Text>
      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="다음" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
    marginTop: responsiveHeight(4),
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(6.4),
    paddingVertical: 4,
  },

  mainColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },

  pinkColor: {
    color: "#FF9EAA",
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(68),
  },
});
