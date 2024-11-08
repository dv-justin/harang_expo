import { authButtonAtom } from "@/app/atoms/auth/authButtonAtom";
import { authCompleteButtonAtom } from "@/app/atoms/auth/authCompleteButtonAtom";
import { phoneNumberAtom } from "@/app/atoms/auth/phoneNumberAtom";
import { placeHolderTextAtom } from "@/app/atoms/auth/placeholderTextAtom";
import { theme } from "@/constants/Theme";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

export default function PhoneNumberInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom);
  const [placeholderText, setPlaceholderText] =
    useRecoilState(placeHolderTextAtom);
  const [authButton, setAuthButton] = useRecoilState(authButtonAtom);
  const [authCompleteButton, setAuthCompleteButton] = useRecoilState(
    authCompleteButtonAtom
  );

  const handleChangePhoneNumber = (text: string) => {
    if (!authButton) {
      setAuthButton(text?.length >= 11 ? true : false);
    }

    if (!authCompleteButton && text?.length < 11) {
      setAuthButton(false);
    }

    setPhoneNumber(text);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.activeColor : styles.inActiveColor,
        ]}
        placeholder={placeholderText}
        placeholderTextColor="#999999"
        keyboardType="numeric"
        maxLength={authCompleteButton ? 4 : 11}
        value={phoneNumber}
        onChangeText={handleChangePhoneNumber}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: responsiveWidth(60),
    height: responsiveHeight(8),
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 2,
    paddingLeft: 16,
    fontSize: responsiveWidth(6),
    fontWeight: "600",
    color: theme.colors.primaryText,
    backgroundColor: "#ffffff",
    letterSpacing: responsiveWidth(0.8),
  },

  activeColor: {
    borderColor: theme.colors.primary,
  },

  inActiveColor: {
    borderColor: theme.colors.subText,
  },
});
