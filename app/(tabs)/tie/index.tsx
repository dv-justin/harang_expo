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
  isOpponentTicket: boolean;
  isFailed: boolean;
}

export default function TieScreen() {
  const router = useRouter();

  const [status, setStatus] = useState(false);
  const [ties, setTies] = useState<Tie[]>([]);
  const [selectTies, setSelectTies] = useState<Tie[]>([]);
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
    if (ties.length) {
      setSelectTies(
        ties.filter((tie) => {
          return status ? tie?.meetingStatus : !tie?.meetingStatus;
        })
      );
    }
  }, [ties, status]);

  useEffect(() => {
    console.log("들어오니?");
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={[
            styles.headerItem,
            !status ? styles.selectHeaderItem : styles.unSelectHeaderItem,
          ]}
          onPress={() => statusButtonClick(false)}
        >
          <Text
            style={[
              !status
                ? styles.selectHeaderItemTitle
                : styles.unSelectHeaderItemTitle,
            ]}
          >
            매칭
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.headerItem,
            status ? styles.selectHeaderItem : styles.unSelectHeaderItem,
          ]}
          onPress={() => statusButtonClick(true)}
        >
          <Text
            style={[
              status
                ? styles.selectHeaderItemTitle
                : styles.unSelectHeaderItemTitle,
            ]}
          >
            만남
          </Text>
        </Pressable>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        scrollIndicatorInsets={{ left: 20 }}
      >
        <View>
          {selectTies.map((tie, index) => (
            <MatchItem
              key={index}
              id={tie?.id}
              name={tie?.name}
              isMyTicket={tie?.isMyTicket}
              isOpponentTicket={tie?.isOpponentTicket}
              meetingStatus={tie.meetingStatus}
              isFailed={tie.isFailed}
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
    backgroundColor: theme.colors.primaryRgb30,
    height: responsiveHeight(90),
    paddingBottom: responsiveHeight(10),
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(72),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerItem: {
    width: responsiveWidth(50),
    padding: responsiveWidth(4),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectHeaderItem: {
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 3,
  },
  unSelectHeaderItem: {},
  selectHeaderItemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  unSelectHeaderItemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.subText,
  },
});
