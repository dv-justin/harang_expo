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

export default function Job() {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [job, setJob] = useState("");

  const [user, setUser] = useRecoilState(userAtom);

  const handleChangeJob = (text: string) => {
    setJob(text);
  };

  const buttonClick = () => {
    if (job) {
      setUser({
        ...user,
        companyName: job,
      });
    }

    router.push("/share-your-faith");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    setJob(user?.companyName);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PageTitle
          title01="재직중인 직장을"
          title02="입력해주세요 (학생은 제외)"
        />
        <Text style={styles.subText}>ex) 삼*전자 / 디*플레이 개발자</Text>
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          placeholder="직장 / 직업"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={job}
          onChangeText={handleChangeJob}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
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
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingLeft: 16,
    fontSize: responsiveWidth(4.8),
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
    marginTop: responsiveHeight(44),
  },
});
