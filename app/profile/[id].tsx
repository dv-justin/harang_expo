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
import { useEffect, useRef, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { theme } from "@/constants/Theme";
import calculateBirthdate from "../common/calculate-birthdate";

export interface Profile {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;
  regionLevel1: string;
  regionLevel2: string;
  churchName?: string;
  pastorName?: string;
  churchRegionName?: string;
  schoolAndMajor?: string;
  companyName?: string;
  yourFaith?: string;
  influentialVerse?: string;
  prayerTopic?: string;
  vision?: string;
  coupleActivity?: string;
  expectedMeeting?: string;
  merit?: string;
  mbti: string;
  manUserTicketUsed: number;
  femaleUserTicketUsed: number;
  allTicketsUsedBy: string;
}

export default function UserProfile() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const birthDate = useRef<number>();

  const [profile, setProfile] = useState<Profile>();

  const getButtonSubText = () => {
    if (
      !profile?.allTicketsUsedBy &&
      !profile?.femaleUserTicketUsed &&
      !profile?.manUserTicketUsed
    ) {
      return "이성이 맘에 든다면?";
    } else if (
      (!profile?.allTicketsUsedBy &&
        profile?.gender === "man" &&
        profile?.manUserTicketUsed) ||
      (!profile?.allTicketsUsedBy &&
        profile?.gender === "female" &&
        profile?.femaleUserTicketUsed)
    ) {
      return "상대방이 티켓 사용을 했어요!";
    } else if (
      (profile?.gender === "man" && profile?.allTicketsUsedBy === "man") ||
      (profile?.gender === "female" && profile?.allTicketsUsedBy === "female")
    ) {
      return "상대방이 김진수님 티켓까지 결제했어요";
    } else if (
      (!profile?.manUserTicketUsed && profile?.femaleUserTicketUsed) ||
      (!profile?.femaleUserTicketUsed && profile?.manUserTicketUsed)
    ) {
      return "조금만 더 기다려주세요";
    }

    return "";
  };

  const getButtonMainText = () => {
    if (
      (!profile?.allTicketsUsedBy &&
        profile?.gender === "female" &&
        !profile?.manUserTicketUsed) ||
      (!profile?.allTicketsUsedBy &&
        profile?.gender === "man" &&
        !profile?.femaleUserTicketUsed)
    ) {
      return "티켓 사용";
    } else if (
      (profile?.gender === "man" && profile?.allTicketsUsedBy === "man") ||
      (profile?.gender === "female" && profile?.allTicketsUsedBy === "female")
    ) {
      return "무료 만남";
    } else if (
      (!profile?.manUserTicketUsed && profile?.femaleUserTicketUsed) ||
      (!profile?.femaleUserTicketUsed && profile?.manUserTicketUsed)
    ) {
      return "상대방의 선택을 기다리고 있어요";
    }

    return "";
  };

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
      const userValue = await getUserId(Number(id), true);
      if (userValue) {
        setProfile(userValue);
        birthDate.current = calculateBirthdate(userValue?.birthdate);
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
    <View style={styles.container}>
      <ScrollView>
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
            <Text style={styles.nameAgeText}>{birthDate.current}</Text>
            <Text style={styles.nameAgeText}> {profile?.mbti}</Text>
          </Text>

          <View style={styles.addInfoGroup}>
            <Image
              style={styles.addInfoImage}
              source={require("@/assets/images/profile/region.png")}
            />
            <Text style={styles.addInfoText}>
              {profile?.regionLevel1} {profile?.regionLevel2}
            </Text>
          </View>
          <View style={styles.addInfoGroup}>
            <Image
              style={styles.addInfoImage}
              source={require("@/assets/images/profile/school.png")}
            />
            <Text style={styles.addInfoText}>{profile?.schoolAndMajor}</Text>
          </View>
          <View style={styles.addInfoGroup}>
            <Image
              style={styles.addInfoImage}
              source={require("@/assets/images/profile/job.png")}
            />
            <Text style={styles.addInfoText}>{profile?.companyName}</Text>
          </View>
        </View>
        <View style={styles.infoGroup}>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/jesus.png")}
            ></Image>
            <Text style={styles.infoTitle}> 내가 만난 하나님</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.yourFaith}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/bible.png")}
            ></Image>
            <Text style={styles.infoTitle}> 나의 인생에 영향을 준 성경</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.influentialVerse}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/prayer.png")}
            ></Image>
            <Text style={styles.infoTitle}> 품고있는 기도제목</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.prayerTopic}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/vision.png")}
            ></Image>
            <Text style={styles.infoTitle}> 주님안에서의 비전</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.vision}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/couple.png")}
            ></Image>
            <Text style={styles.infoTitle}> 연인과 하고싶은 활동</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.coupleActivity}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/expected.png")}
            ></Image>
            <Text style={styles.infoTitle}> 기대하는 만남</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.expectedMeeting}</Text>
          </View>
          <View style={styles.infoTitleGroup}>
            <Image
              style={styles.infoTitleIcon}
              source={require("@/assets/images/profile/merit.png")}
            ></Image>
            <Text style={styles.infoTitle}> 매력 혹은 장점</Text>
          </View>
          <View style={styles.infoContentsGroup}>
            <Text style={styles.infoContent}>{profile?.merit}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.useTicketButton}>
        <Text style={styles.useTicketButtonSubText}>{getButtonSubText()}</Text>
        <Text style={styles.useTicketButtonText}>{getButtonMainText()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    paddingBottom: responsiveHeight(8),
    backgroundColor: theme.colors.white,
    position: "relative",
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
  infoTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoTitleIcon: {
    width: 24,
    height: 24,
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

  useTicketButton: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(8.8),
    borderRadius: 10,
    marginLeft: responsiveWidth(5),
    backgroundColor: theme.colors.primary,
    bottom: 10,
  },
  useTicketButtonText: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "700",
    paddingTop: 4,
  },
  useTicketButtonSubText: {
    fontSize: 18,
    color: theme.colors.sub,
    fontWeight: "700",
  },
});
