import calculateBirthdate from "@/app/common/calculate-birthdate";
import { userAtom } from "@/atoms/user/userAtom";
import { theme } from "@/constants/Theme";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

export default function MyScreen() {
  const [user, setUser] = useRecoilState(userAtom);

  const clickItem = (type: string) => {
    if (type === "idealType") {
      router.push("/ideal-type");
    } else if (type === "myProfile") {
      router.push(`/profile/${user?.id}`);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileImage}>
          <Image
            style={styles.profileImage}
            source={require("@/assets/images/profile.png")}
          />
        </View>
        <View style={styles.profileContent}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileInfo}>
            {calculateBirthdate(user?.birthDate)},{" "}
            {user?.companyName ? user?.companyName : user?.schoolAndMajor}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.contentGroup}>
        <Pressable
          style={styles.contentItem}
          onPress={() => clickItem("idealType")}
        >
          <Text style={styles.myTitle}>이상형</Text>
        </Pressable>
        <Pressable
          style={styles.contentItem}
          onPress={() => clickItem("myProfile")}
        >
          <Text style={styles.myTitle}>내 프로필</Text>
        </Pressable>
      </View>
      <View style={styles.line}></View>
      <View style={styles.contentGroup}>
        <View style={styles.contentItem}>
          <Text style={styles.myTitle}>결제내역</Text>
        </View>
        <View style={styles.contentItem}>
          <Text style={styles.myTitle}>포인트</Text>
        </View>
        <View style={styles.contentItem}>
          <Text style={styles.myTitle}>계정관리</Text>
        </View>
        <View style={styles.contentItem}>
          <Text style={styles.myTitle}>신고</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.contentGroup}>
        <View style={styles.contentItem}>
          <Text style={styles.mySubTitle}>카톡채널 문의하기</Text>
        </View>
        <View style={styles.contentItem}>
          <Text style={styles.mySubTitle}>로그아웃</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    paddingVertical: responsiveWidth(8),
    backgroundColor: theme.colors.background,
  },
  profile: {
    flexDirection: "row",
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(2),
  },
  profileImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: 10,
  },
  profileContent: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: responsiveWidth(2.8),
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
  },
  profileInfo: {
    fontSize: 16,
  },
  line: {
    width: responsiveWidth(100),
    height: 2,
    backgroundColor: theme.colors.white,
    marginTop: responsiveHeight(2),
  },
  contentGroup: {
    flexDirection: "column",
    paddingHorizontal: responsiveWidth(6),
  },
  contentItem: {
    paddingTop: responsiveHeight(3),
  },
  mySubTitle: {
    fontSize: 14,
    color: theme.colors.primaryText,
    fontWeight: "600",
  },
  myTitle: {
    fontSize: 18,
    color: theme.colors.primaryText,
    fontWeight: "600",
  },
});
