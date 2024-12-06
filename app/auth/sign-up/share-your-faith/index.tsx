import { userAtom } from "@/atoms/user/userAtom";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

export default function ShareYourFaith() {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [yourFaith, setYourFaith] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);

  const handleChangeYourFaith = (text: string) => {
    setYourFaith(text);
  };

  const buttonClick = () => {
    setButtonState(true);
    if (yourFaith.length < 30) {
      return;
    }

    setUser({
      ...user,
      yourFaith: yourFaith,
    });

    router.push("/auth/sign-up/bible-verse");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PageTitle title01="당신이 만난 하나님을" title02="나눠주세요" />
        <Text style={styles.subText}>{yourFaith?.trim()?.length}/500</Text>
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          multiline={true}
          placeholder="최소 30자 이상 입력해주세요 ㅎㅎ"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={yourFaith}
          onChangeText={handleChangeYourFaith}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Text style={styles.alarmInputName}>
          {buttonState && yourFaith?.length < 30
            ? "최소 30자 이상 입력해주세요!!"
            : ""}
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
  subText: {
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    color: theme.colors.subText,
    paddingTop: responsiveHeight(4),
    paddingBottom: responsiveHeight(1),
  },
  numberCharactersText: {},
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: responsiveHeight(1),
    paddingLeft: 12,
    fontSize: responsiveWidth(4),
    fontWeight: "700",
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
    marginTop:
      responsiveHeight(100) > 875 ? responsiveHeight(32) : responsiveHeight(28),
  },
});
