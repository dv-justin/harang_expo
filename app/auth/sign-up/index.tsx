import PageTitle from "@/common/components/PageTitle";
import PhoneNumberInput from "@/common/components/PhoneNumberInput";
import SubTitle from "@/common/components/SubTitle";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AuthCompleteButton from "./components/AuthCompleteButton";

export default function SignUp() {
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
        <AuthCompleteButton title="인증" />
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
