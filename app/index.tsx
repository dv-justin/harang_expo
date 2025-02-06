import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/Theme";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { getAccessToken, getRefreshToken } from "@/services/auth/auth";
import { getUserIdToken } from "@/services/user/api";
import { useRecoilState } from "recoil";
import { initialUserState, userAtom } from "@/atoms/user/userAtom";

export default function Landing() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userAtom);

  const moveRouter = (status: string | undefined) => {
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

    router.push("/auth");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = await getAccessToken();

        let userStatus: string | undefined;
        if (accessToken) {
          const userValue = await getUserIdToken();
          userStatus = userValue?.status;
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

          moveRouter(userStatus);
          return;
        }
        setUser(initialUserState);
        moveRouter(userStatus);
      } catch (error: any) {
        if (error.status === 401) {
          router.replace("/auth");
          return;
        }
        router.replace("/error");
      }
    };

    checkAuthentication();
  }, [router]);
  return (
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={[styles.logoSubTitle]}>하나님안에서의 사랑</Text>
          <Text style={[styles.logoTitle, styles.primaryColor]}>하랑</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  logo: {
    marginTop: responsiveHeight(40),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: responsiveWidth(14),
    fontWeight: "bold",
  },
  logoSubTitle: {
    fontSize: responsiveWidth(4),
    fontWeight: "bold",
    color: "#FF9EAA",
  },
  primaryColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },
});
