import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function Companion() {
  const router = useRouter();
  const clickUpdate = () => {
    router.replace("/name");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text style={styles.title}>프로필 수정</Text>
        <Text style={styles.title}>부탁드려요!</Text>
      </View>
      <Pressable style={styles.updateButtonGroup} onPress={clickUpdate}>
        <Text style={styles.updateButtonTitle}>프로필 수정하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: responsiveWidth(5),
  },

  loading: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
  },

  titleGroup: {
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: responsiveHeight(6),
  },

  title: {
    fontSize: responsiveWidth(6),
    fontWeight: "700",
    color: theme.colors.primary,
  },

  updateItemGroup: {},

  updateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.primaryText,
  },

  updateItemContentGroup: {
    marginTop: responsiveHeight(2),
    height: responsiveHeight(56),
  },

  updateItemContent: {
    width: responsiveWidth(90),
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 24,
    marginTop: 12,
  },

  updateItemContentTitle: {
    fontSize: 18,
  },

  updateButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 148,
    height: 64,
    backgroundColor: theme.colors.sub,
    borderRadius: 10,
  },

  updateButtonTitle: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "700",
  },
});
