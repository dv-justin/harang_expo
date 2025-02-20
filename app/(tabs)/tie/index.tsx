import MatchItem from "@/components/MatchItem";
import { theme } from "@/constants/Theme";
import { refreshAccessToken } from "@/services/auth/api";
import { getRefreshToken, setAccessToken } from "@/services/auth/auth";
import { getTies } from "@/services/tie/api";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

interface Tie {
  id: number;
  name: string;
  meetingStatus: number;
  isMyTicket: boolean;
  isMyAfter: boolean;
  isYourAfter: boolean;
}

export default function TieScreen() {
  const router = useRouter();

  const [status, setStatus] = useState(false);
  const [ties, setTies] = useState<Tie[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusButtonClick = (statusValue: boolean) => {
    setStatus(statusValue);
    return;
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
      const tiesValue = await getTies();

      if (tiesValue) {
        setTies(tiesValue);
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
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        scrollIndicatorInsets={{ left: 20 }}
      >
        <View>
          {ties.map((tie, index) => (
            <MatchItem
              key={index}
              id={tie?.id}
              name={tie?.name}
              isMyTicket={tie?.isMyTicket}
              isMyAfter={tie?.isMyAfter}
              isYourAfter={tie?.isYourAfter}
              meetingStatus={tie.meetingStatus}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    height: responsiveHeight(90),
    paddingBottom: responsiveHeight(10),
  },
});
