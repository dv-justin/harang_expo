import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { updateTieAfter } from "@/services/tie/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function ApplicationAfter() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const handleButton = async (status: boolean) => {
    await updateTieAfter(Number(id), { user_after: status });
    return router.back();
  };
  return (
    <View style={styles.container}>
      <PageTitle title01="맘에 드셨다면" title02="애프터 신청 부탁드려요!" />

      <View style={styles.selectButtonGroup}>
        <Pressable
          style={[styles.selectButton, styles.primaryBackgroundColor]}
          onPress={() => handleButton(true)}
        >
          <Text style={styles.buttonTitle}>
            맘에 들었어요 애프터 신청할게요!
          </Text>
        </Pressable>
        <View>
          <Pressable
            style={[styles.selectButton, styles.subBackgroundColor]}
            onPress={() => handleButton(false)}
          >
            <Text style={styles.buttonTitle}>별로였어요 다음 기회에...</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  selectButtonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(10),
  },
  selectButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginBottom: responsiveHeight(1.6),
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.white,
  },
  primaryBackgroundColor: {
    backgroundColor: theme.colors.primary,
  },
  subBackgroundColor: {
    backgroundColor: theme.colors.sub,
  },
});
