import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function ApplicationAfter() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const handleApplicationButton = () => {
    setButtonState(true);

    if (message.length < 30) {
      return;
    }

    router.push("/point");
  };

  return (
    <View style={styles.container}>
      <PageTitle title01="애프터 신청 메세지를" title02="작성해주세요" />
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.activeColor : styles.inActiveColor,
        ]}
        multiline={true}
        placeholder="최소 30자 이상 입력해주세요"
        placeholderTextColor="#999999"
        keyboardType="default"
        value={message}
        onChangeText={handleChangeMessage}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Text style={styles.alarmInputName}>
        {buttonState && message?.length < 30
          ? "최소 30자 이상 입력해주세요!!"
          : ""}
      </Text>
      <Pressable style={styles.buttonGroup} onPress={handleApplicationButton}>
        <Button title="애프터 신청하기" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },

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
    marginTop: responsiveHeight(2),
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop:
      responsiveHeight(100) > 875 ? responsiveHeight(32) : responsiveHeight(28),
  },

  alarmInputName: {
    height: responsiveHeight(4),
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    marginTop: responsiveHeight(1),
    color: theme.colors.inActiveText,
  },

  activeColor: {
    borderColor: theme.colors.primary,
  },

  inActiveColor: {
    borderColor: theme.colors.subText,
  },
});
