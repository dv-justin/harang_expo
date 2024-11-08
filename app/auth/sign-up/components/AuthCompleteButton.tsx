import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";
import { phoneNumberAtom } from "@/app/atoms/auth/phoneNumberAtom";
import { placeHolderTextAtom } from "@/app/atoms/auth/placeholderTextAtom";
import { authButtonAtom } from "@/app/atoms/auth/authButtonAtom";
import { authCompleteButtonAtom } from "@/app/atoms/auth/authCompleteButtonAtom";
import { useRouter } from "expo-router";

interface ButtonProps {
  title: string;
}

export default function AuthCompleteButton({ title }: ButtonProps) {
  const router = useRouter();

  const routerAddInfo = () => {
    router.push("/auth/sign-up/eligibility-verification");
  };

  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom);
  const [placeholderText, setPlaceholderText] =
    useRecoilState(placeHolderTextAtom);
  const [authButton, setAuthButtonAtom] = useRecoilState(authButtonAtom);
  const [authCompleteButton, setAuthCompleteButton] = useRecoilState(
    authCompleteButtonAtom
  );

  const handleClickButton = () => {
    if (authButton && !authCompleteButton) {
      setPhoneNumber("");
      setPlaceholderText("인증번호");
      setAuthCompleteButton(true);
      console.log("인증요청 완료");
    }

    if (authButton && authCompleteButton) {
      console.log("인증번호 확인 완료");
      routerAddInfo();
    }
  };

  return (
    <Pressable
      onPress={handleClickButton}
      style={[
        styles.container,
        authButton
          ? authCompleteButton
            ? styles.activeCompleteBackgroundColor
            : styles.activeAuthBackgroundColor
          : styles.inactiveBackgroundColor,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveHeight(3),
    paddingVertical: responsiveWidth(2),
    borderRadius: 15,
  },

  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },

  activeAuthBackgroundColor: {
    backgroundColor: theme.colors.primary,
  },

  activeCompleteBackgroundColor: {
    backgroundColor: theme.colors.sub,
  },

  inactiveBackgroundColor: {
    backgroundColor: theme.colors.subText,
  },
});
