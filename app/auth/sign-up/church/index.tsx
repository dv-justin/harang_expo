import Button from "@/common/components/Button";
import PageTitle from "@/common/components/PageTitle";
import SubTitle from "@/common/components/SubTitle";
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
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function Church() {
  const router = useRouter();

  const [isChurchNameFocused, setIsChurchNameFocused] = useState(false);
  const [isPastorFocused, setIsPastorFocused] = useState(false);
  const [churchName, setChurchName] = useState("");
  const [pastor, setPastor] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const handleChangeChurch = (text: string) => {
    setChurchName(text);
  };

  const handleChangePastor = (text: string) => {
    setPastor(text);
  };

  const buttonClick = () => {
    setButtonState(true);
    if (!churchName) {
      return;
    }
    router.push("/auth/sign-up/region");
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <PageTitle title01="현재 섬기고 있는 교회를" title02="입력해주세요" />

        <Text style={styles.title}>섬기고 있는 교회 이름</Text>
        <TextInput
          style={[
            styles.input,
            isChurchNameFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          placeholder="교회 이름"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={churchName}
          onChangeText={handleChangeChurch}
          onFocus={() => setIsChurchNameFocused(true)}
          onBlur={() => setIsChurchNameFocused(false)}
        />
        <Text style={styles.alarmInputName}>
          {buttonState && !churchName ? "교회 이름을 입력해주세요!" : ""}
        </Text>

        <Text style={styles.title}>담임목사 성함</Text>
        <TextInput
          style={[
            styles.input,
            isPastorFocused ? styles.activeColor : styles.inActiveColor,
          ]}
          placeholder="담임목사 성함"
          placeholderTextColor="#999999"
          keyboardType="default"
          value={pastor}
          onChangeText={handleChangePastor}
          onFocus={() => setIsPastorFocused(true)}
          onBlur={() => setIsPastorFocused(false)}
        />
        <Text style={styles.alarmInputName}>
          {buttonState && !pastor ? "담임목사 성함을 입력해주세요!" : ""}
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
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  main: {
    height: responsiveHeight(76),
  },
  title: {
    fontSize: responsiveWidth(4.4),
    fontWeight: "700",
    color: theme.colors.primaryText,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingLeft: 16,
    fontSize: responsiveWidth(4),
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
    // marginTop: responsiveHeight(44),
  },
});
