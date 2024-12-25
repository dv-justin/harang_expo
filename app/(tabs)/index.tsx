import { theme } from "@/constants/Theme";
import { refreshAccessToken } from "@/services/auth/api";
import { getRefreshToken, setAccessToken } from "@/services/auth/auth";
import { getHome } from "@/services/home/api";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import maskMiddleName from "../common/mask-middle-name";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";

interface Home {
  id: string;
  name: string;
  address: string;
  birthdate: string;
}

export default function HomeScreen() {
  const router = useRouter();

  const [home, setHome] = useState<Home>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getProfile = () => {
    router.push(`/profile/${home?.id}`);
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
          console.error("Failed to refresh access token:", refreshError);
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
      const homeValue = await getHome();

      if (homeValue) {
        setHome(homeValue);
      }
    } catch (error: any) {
      handleUnauthorizedError(error);
    }
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <GestureHandlerRootView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {home?.name ? (
          <View style={styles.introductionGroup}>
            <Image
              style={styles.letterImage}
              resizeMode="contain"
              source={require("@/assets/images/letter.png")}
            />
            <Text style={styles.introductionText}>소개가 도착했어요</Text>
            <Text style={styles.introductionSubText}>
              24시간 이내로 선택 부탁드려요
            </Text>
            <Pressable onPress={getProfile}>
              <Image
                style={styles.profileImage}
                source={require("@/assets/images/profile.png")}
              />
            </Pressable>
            <View style={styles.infoGroup}>
              <Text style={styles.infoText}>
                {maskMiddleName(home?.name)} {home?.birthdate}
              </Text>
              <Text style={styles.infoText}>{home?.address} </Text>
            </View>
          </View>
        ) : (
          <View style={styles.lookingFor}>
            <Text style={styles.lookingForText}>매니저가 좋은 인연을</Text>
            <Text style={styles.lookingForText}>찾고있는 중이에요!</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.introductionGuideGroup}>
        <Text style={styles.introductionGuideTitle}>하랑 소개 가이드</Text>
        <Image
          style={styles.nextImage}
          source={require("@/assets/images/next.png")}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: responsiveHeight(80),
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    paddingLeft: responsiveWidth(5),
    paddingTop: responsiveHeight(4),
  },

  lookingFor: {
    width: responsiveWidth(90),
    height: responsiveHeight(64),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  lookingForText: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: "700",
    paddingTop: 2,
  },

  intruductionTitleGroup: {
    paddingTop: responsiveHeight(4),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  letterImage: {
    width: 40,
    height: 40,
    paddingRight: 4,
  },

  introductionGroup: {
    width: responsiveWidth(90),
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 12,
    marginTop: responsiveHeight(4),
  },

  introductionText: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.primary,
    paddingTop: 4,
  },

  introductionSubText: {
    fontSize: 14,
    color: theme.colors.primaryText,
    fontWeight: "700",
    marginBottom: responsiveHeight(2),
  },

  profileImage: {
    width: responsiveWidth(64),
    height: responsiveWidth(72),
    paddingTop: responsiveHeight(2),
    borderRadius: 20,
    opacity: 0.4,
  },

  infoGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: responsiveHeight(2),
  },

  infoText: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primaryText,
    paddingTop: responsiveHeight(0.5),
  },

  nextImage: {
    width: 20,
    height: 20,
  },

  introductionGuideGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    backgroundColor: theme.colors.primaryRgb,
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
    paddingHorizontal: 24,
  },
  introductionGuideTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.white,
  },
});
