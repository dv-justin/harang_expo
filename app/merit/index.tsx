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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

export default function Merit() {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);

  const handleChangeContent = (text: string) => {
    setContent(text);
  };

  const buttonClick = () => {
    setButtonState(true);
    if (content.length < 20) {
      return;
    }

    setUser({
      ...user,
      merit: content,
    });

    router.push("/profile-image");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    setContent(user?.merit);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PageTitle title01="매력 혹은 장점에 대해" title02="알려주세요" />
        <Text style={styles.subText}>{content?.trim()?.length}/500</Text>
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          multiline={true}
          placeholder="최소 20자 이상 입력해주세요 ㅎㅎ"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={content}
          onChangeText={handleChangeContent}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Text style={styles.alarmInputName}>
          {buttonState && content?.length < 20
            ? "최소 20자 이상 입력해주세요"
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
