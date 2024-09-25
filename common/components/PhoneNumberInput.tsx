import { theme } from "@/constants/Theme";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function PhoneNumberInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.activeColor : styles.inActiveColor,
        ]}
        placeholder="01012345678"
        placeholderTextColor="#999999"
        keyboardType="numeric"
        maxLength={11}
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
