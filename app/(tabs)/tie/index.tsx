import MatchItem from "@/components/MatchItem";
import { theme } from "@/constants/Theme";
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
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  meeting_date: string | null;
  meeting_status: number;
  man_user: {
    id: number;
  };
  female_user: {
    id: number;
  };
  man_user_ticket_used: boolean;
  female_user_ticket_used: boolean;
  is_failed: boolean;
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

  const fetchData = async (isRefresh = false) => {
    try {
      const tiesValue = await getTies();
      if (tiesValue) {
        setTies(tiesValue);
      }
    } catch (error) {
      console.error("데이터 요청 실패:", error);
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
          return status ? tie?.meeting_status : !tie?.meeting_status;
        })
      );
    }
  }, [ties, status]);

  useEffect(() => {
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
              name="김진수"
              gender="man"
              manUserTicketUsed={tie.man_user_ticket_used}
              femaleUserTicketUsed={tie.female_user_ticket_used}
              meetingStatus={tie.meeting_status}
              checkTicket={false}
              isFailed={tie.is_failed}
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
    backgroundColor: theme.colors.primaryRgb20,
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
