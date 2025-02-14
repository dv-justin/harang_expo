import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { useRecoilState } from "recoil";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { theme } from "@/constants/Theme";
import { userAtom } from "@/atoms/user/userAtom";
import { useRouter } from "expo-router";
import { getUserInfo } from "@/services/auth/api";
import { setAuthTokens } from "@/services/auth/auth";
import { getUserIdToken } from "@/services/user/api";

export default function SignUp() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [placeholderText, setPlaceholderText] = useState("01034320441");
  const [authButton, setAuthButton] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);

  const handleChangePhoneNumber = (text: string) => {
    if (!authButton) {
      setAuthButton(text?.length >= 11 ? true : false);
    }

    if (!completeButton && text?.length < 11) {
      setAuthButton(false);
    }

    setPhoneNumber(text);
  };

  const handleChangeAuthNumber = (text: string) => {
    setAuthNumber(text);
  };

  const handleClickButton = async () => {
    if (authButton && !completeButton) {
      setPhoneNumber(phoneNumber);
      setPlaceholderText("인증번호");
      setCompleteButton(true);
      console.log("인증요청 완료");
    }

    if (authButton && completeButton) {
      console.log("인증번호 확인 완료");

      try {
        const serverUser = await getUserInfo(phoneNumber);
        if (serverUser) {
          await setAuthTokens(
            serverUser?.accessToken,
            serverUser?.refreshToken
          );

          const userValue = await getUserIdToken();
          const {
            id,
            status,
            name,
            gender,
            birthdate,
            phoneNumber,
            regionLevel1,
            regionLevel2,
            churchName,
            pastorName,
            schoolAndMajor,
            companyName,
            yourFaith,
            influentialVerse,
            prayerTopic,
            vision,
            coupleActivity,
            expectedMeeting,
            merit,
          } = userValue;
          setUser({
            ...user,
            id: id,
            status: status,
            name,
            gender,
            birthDate: birthdate,
            phoneNumber,
            regionLevel1,
            regionLevel2,
            churchName,
            pastorName,
            schoolAndMajor,
            companyName,
            yourFaith,
            influentialVerse,
            prayerTopic,
            vision,
            coupleActivity,
            expectedMeeting,
            merit,
          });

          moveRouter(serverUser?.status);

          return;
        }
        setUser({
          ...user,
          phoneNumber: phoneNumber,
        });
        moveRouter();
      } catch (error) {
        router.replace("/error");
        return;
      }
    }
  };

  const moveRouter = (status?: string) => {
    if (status === "심사 중") {
      router.push("/approval-pending");
      return;
    } else if (status === "정상") {
      router.push("/(tabs)");
      return;
    } else if (status === "반려") {
      router.push("/companion");
      return;
    }
    router.push("/eligibility-verification");
  };

  return (
    <View style={styles.container}>
      <PageTitle title01="휴대폰 번호를" title02="입력해주세요" />
      <View style={styles.subTitleGroup}>
        <Text style={[styles.subTitle]}>간편하게 휴대폰 번호로</Text>
        <Text style={styles.subTitle}>로그인/회원가입을 해보세요!</Text>
      </View>

      <View style={styles.phoneNumberInput}>
        <View>
          {!completeButton ? (
            <TextInput
              style={[
                styles.input,
                isFocused ? styles.activeColor : styles.inActiveColor,
              ]}
              placeholder={placeholderText}
              placeholderTextColor="#999999"
              keyboardType="numeric"
              maxLength={completeButton ? 4 : 11}
              value={phoneNumber}
              onChangeText={handleChangePhoneNumber}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          ) : (
            <TextInput
              style={[
                styles.input,
                isFocused ? styles.activeColor : styles.inActiveColor,
              ]}
              placeholder={placeholderText}
              placeholderTextColor="#999999"
              keyboardType="numeric"
              maxLength={completeButton ? 4 : 11}
              value={authNumber}
              onChangeText={handleChangeAuthNumber}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </View>
        <Pressable
          onPress={handleClickButton}
          style={[
            styles.buttonContainer,
            authButton
              ? completeButton
                ? styles.buttonActiveCompleteBackgroundColor
                : styles.buttonActiveAuthBackgroundColor
              : styles.buttonInactiveBackgroundColor,
          ]}
        >
          <Text style={styles.buttonTitle}>
            {completeButton ? "확인" : "인증"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },

  subTitleGroup: {
    paddingTop: 8,
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.subText,
  },

  phoneNumberInput: {
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: responsiveWidth(60),
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
  },

  activeColor: {
    borderColor: theme.colors.primary,
  },

  inActiveColor: {
    borderColor: theme.colors.subText,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveHeight(3),
    paddingVertical: responsiveWidth(2),
    borderRadius: 10,
  },

  buttonTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },

  buttonActiveAuthBackgroundColor: {
    backgroundColor: theme.colors.primary,
  },

  buttonActiveCompleteBackgroundColor: {
    backgroundColor: theme.colors.sub,
  },

  buttonInactiveBackgroundColor: {
    backgroundColor: theme.colors.subText,
  },
});
