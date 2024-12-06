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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
export default function Gender() {
  const router = useRouter();

  const [gender, setGender] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const genderButtonClick = (type: string) => {
    setGender(type);
  };
  const buttonClick = () => {
    setButtonState(true);

    if (!gender) {
      return;
    }

    router.push("/auth/sign-up/region");
  };
  return (
    <View style={styles.container}>
      <PageTitle title01="성별을" title02="입력해주세요" />
      <View style={styles.genderGroup}>
        <Pressable
          style={[
            styles.selectGender,
            gender === "man" ? styles.selectMan : styles.unSelectMan,
          ]}
          onPress={() => genderButtonClick("man")}
        >
          <Text
            style={
              gender === "man"
                ? styles.selectGenderTitle
                : styles.unSelectGenderTitle
            }
          >
            남자
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.selectGender,
            gender === "female" ? styles.selectFemale : styles.unSelectFemale,
          ]}
          onPress={() => genderButtonClick("female")}
        >
          <Text
            style={
              gender === "female"
                ? styles.selectGenderTitle
                : styles.unSelectGenderTitle
            }
          >
            여자
          </Text>
        </Pressable>
      </View>
      <Text style={styles.alarmInputName}>
        {buttonState && !gender ? "성별을 선택해주세요!" : ""}
      </Text>
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
  genderGroup: {
    flexDirection: "row",
    width: responsiveWidth(100),
    marginTop: responsiveHeight(8),
  },
  selectGender: {
    width: responsiveWidth(42),
    height: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  selectMan: {
    backgroundColor: theme.colors.primary,
    marginRight: responsiveWidth(3),
  },
  selectFemale: {
    backgroundColor: theme.colors.sub,
    marginLeft: responsiveWidth(3),
  },
  unSelectMan: {
    borderWidth: 1,
    borderColor: theme.colors.subText,
    marginRight: responsiveWidth(3),
  },
  unSelectFemale: {
    borderWidth: 1,
    borderColor: theme.colors.subText,
    marginLeft: responsiveWidth(3),
  },
  selectGenderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.white,
  },
  unSelectGenderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.subText,
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
    marginTop: responsiveHeight(39),
  },
});
