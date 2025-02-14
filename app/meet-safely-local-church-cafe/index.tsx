import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { theme } from "@/constants/Theme";
import { register } from "@/services/auth/api";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/user/userAtom";
import { setAuthTokens } from "@/services/auth/auth";

export default function MeetSafelyLocalChurchCafe() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userAtom);

  const buttonClick = async () => {
    try {
      await register(user);
    } catch (error) {
      router.push("/error");
    }

    router.push("/approval-pending");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text>
          <Text style={[styles.title, styles.mainColor]}>
            카페
          </Text>
          <Text style={[styles.title, styles.subColor]}>에서</Text>
        </Text>
        <Text>
          <Text style={[styles.title, styles.mainColor]}>안전한 만남</Text>
          <Text style={[styles.title, styles.subColor]}>이 진행돼요!</Text>
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
