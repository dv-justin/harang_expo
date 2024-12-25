import { userAtom } from "@/atoms/user/userAtom";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

export default function Name() {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);

  const handleChangeName = (text: string) => {
    setName(text);
  };

  const buttonClick = () => {
    setButtonState(true);
    if (!name) {
      return;
    }
    setUser({
      ...user,
      name: name,
    });
    router.push("/birthdate");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    setName(user?.name);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PageTitle title01="이름을" title02="입력해주세요" />

        <TextInput
          style={[
            styles.input,
            isFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          placeholder="이름을 입력해주세요!"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={name}
          onChangeText={handleChangeName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <Text style={styles.alarmInputName}>
          {buttonState && !name ? "이름을 입력해주세요!" : ""}
        </Text>
        <Pressable style={styles.buttonGroup} onPress={buttonClick}>
          <Button title="다음" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingLeft: 16,
    fontSize: responsiveWidth(4.8),
    fontWeight: "600",
    color: theme.colors.primaryText,
    backgroundColor: "#ffffff",
    letterSpacing: responsiveWidth(0.8),
    marginTop: 24,
  },

  activeColor: {
    borderColor: theme.colors.primary,
  },

  inActiveColor: {
    borderColor: theme.colors.subText,
  },

  alarmInputName: {
    height: responsiveHeight(4),
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    marginTop: responsiveHeight(1),
    color: theme.colors.inActiveText,
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(48),
  },
});
