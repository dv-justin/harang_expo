import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { theme } from "@/constants/Theme";

export default function PureIntentions() {
  const router = useRouter();

  const buttonClick = () => {
    router.push("/purity-only");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text>
          <Text style={[styles.title, styles.mainColor]}>진심으로 하나님</Text>
          <Text style={[styles.title, styles.subColor]}>을</Text>
        </Text>
        <Text>
          <Text style={[styles.title, styles.mainColor]}>바라보는 사람</Text>
          <Text style={[styles.title, styles.subColor]}>들을 위한</Text>
        </Text>
      </View>
      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="다음" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    flexDirection: "column",
    alignItems: "center",
  },

  titleGroup: {
    marginTop: responsiveHeight(30),
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

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(42),
  },
});
