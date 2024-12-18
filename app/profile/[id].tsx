import { refreshAccessToken } from "@/services/auth/api";
import { getRefreshToken, setAccessToken } from "@/services/auth/auth";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { getUserId } from "@/services/user/api";
import { useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { theme } from "@/constants/Theme";
import calculateBirthdate from "../common/calculate-birthdate";

export interface profile {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;
  regionLevel1: string;
  regionLevel2: string;
  churchName?: string;
  pastorName?: string;
  schoolAndMajor?: string;
  companyName?: string;
  yourFaith?: string;
  influentialVerse?: string;
  prayerTopic?: string;
  vision?: string;
  coupleActivity?: string;
  expectedMeeting?: string;
  merit?: string;
}

export default function UserProfile() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const [profile, setProfile] = useState<profile>();

  async function handleUnauthorizedError(error: any) {
    if (error.status === 401) {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        try {
          const { access_token: accessToken } = await refreshAccessToken(
            refreshToken
          );
          await setAccessToken(accessToken);
          await fetchData();
        } catch (refreshError: any) {
          router.replace("/auth");
        }
        return;
      }

      router.replace("/auth");
    }
    router.replace("/error");
  }

  const fetchData = async () => {
    try {
      const userValue = await getUserId(Number(id));
      if (userValue) {
        setProfile(userValue);
      }
    } catch (error: any) {
      handleUnauthorizedError(error);
    }
  };

  const handleBackClickButton = () => {
    router.back();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageGroup}>
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/profile.png")}
        />
        <Pressable
          style={styles.backImageGroup}
          onPress={handleBackClickButton}
        >
          <Image
            style={styles.backImage}
            source={require("@/assets/images/back-white.png")}
          />
        </Pressable>
      </View>

      <View style={styles.defaultInfoGroup}>
        <Text>
          <Text style={styles.nameAgeText}>{profile?.name} </Text>
          <Text style={styles.nameAgeText}>
            {calculateBirthdate(profile?.birthdate!)}
          </Text>
        </Text>

        <View style={styles.addInfoGroup}>
          <Image
            style={styles.addInfoImage}
            source={require("@/assets/images/profile/region.png")}
          />
          <Text style={styles.addInfoText}>인천광역시</Text>
        </View>
        <View style={styles.addInfoGroup}>
          <Image
            style={styles.addInfoImage}
            source={require("@/assets/images/profile/school.png")}
          />
          <Text style={styles.addInfoText}>서울대/경영학과</Text>
        </View>
        <View style={styles.addInfoGroup}>
          <Image
            style={styles.addInfoImage}
            source={require("@/assets/images/profile/job.png")}
          />
          <Text style={styles.addInfoText}>IT/개발자</Text>
        </View>
      </View>
      <View style={styles.infoGroup}>
        <Text style={styles.infoTitle}>1. 내가 만난 하나님</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>2.나의 인생에 영향을 준 성경</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>3. 품고있는 기도제목</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>4. 주님안에서의 비전</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>5. 연인과 하고싶은 활동</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>6. 기대하는 만남</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
        <Text style={styles.infoTitle}>7. 매력 혹은 장점</Text>
        <View style={styles.infoContentsGroup}>
          <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: theme.colors.primaryRgb20,
  },
  backImageGroup: {
    position: "absolute",
  },
  backImage: {
    width: 28,
    height: 28,
    top: 20,
    left: 10,
  },
  profileImageGroup: {},
  profileImage: {
    width: responsiveWidth(100),
    height: responsiveWidth(90),
  },
  defaultInfoGroup: {
    width: responsiveWidth(90),
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginLeft: responsiveWidth(5),
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  nameAgeText: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  addInfoGroup: {
    flexDirection: "row",
    paddingTop: 12,
  },
  addInfoText: {
    color: theme.colors.white,
    fontSize: 18,
  },
  addInfoImage: {
    width: 24,
    height: 24,
    paddingRight: 6,
  },

  infoGroup: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },

  infoTitle: {
    fontSize: 20,
    color: theme.colors.primaryText,
    fontWeight: "700",
  },

  infoContentsGroup: {
    width: responsiveWidth(90),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 20,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(4),
  },

  infoContent: {
    color: "#666F7B",
    fontSize: 18,
    fontWeight: "700",
  },
});
