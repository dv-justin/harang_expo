import React from "react";
import PageTitle from "@/common/components/PageTitle";
import SubTitle from "@/common/components/SubTitle";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import AuthCompleteButton from "./components/AuthCompleteButton";
import PhoneNumberInput from "./components/PhoneNumberInput";
import { useRecoilState } from "recoil";
import { authCompleteButtonAtom } from "@/app/atoms/auth/authCompleteButtonAtom";

export default function SignUp() {
  const [authCompleteButton, setAuthCompleteButton] = useRecoilState(
    authCompleteButtonAtom
  );

  return (
    <View style={styles.container}>
      <PageTitle title01="휴대폰 번호를" title02="입력해주세요" />
      <View style={styles.subTitle}>
        <SubTitle
          title01="간편하게 휴대폰 번호로"
          title02="로그인/회원가입을 해보세요!"
        />
      </View>
      <View style={styles.phoneNumberInput}>
        <PhoneNumberInput />
        <AuthCompleteButton title={authCompleteButton ? "확인" : "인증"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },

  subTitle: {
    paddingTop: 8,
  },

  phoneNumberInput: {
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
