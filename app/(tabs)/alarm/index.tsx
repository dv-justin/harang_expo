import { theme } from "@/constants/Theme";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import io from "socket.io-client";

interface Notification {
  id: number;
  contents: string;
  category: string;
}

export default function AlarmScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const socket = io("http://localhost:4001/notifications", {
      transports: ["websocket"],
    });

    socket.on("notifications", (data) => {
      console.log("Received message:", data);
      setNotifications(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getBadgeStyle = (category: string) => {
    let backgroundColor;
    switch (category) {
      case "결제":
        backgroundColor = theme.colors.payment;
        break;
      case "만남":
        backgroundColor = theme.colors.primary;
        break;
      case "매칭":
        backgroundColor = theme.colors.matching;
        break;
      default:
        backgroundColor = theme.colors.primary;
    }
    return {
      ...styles.badge,
      backgroundColor,
    };
  };

  const getAlarmItemStyle = (category: string) => {
    let backgroundColor;
    switch (category) {
      case "결제":
        backgroundColor = theme.colors.paymentRgb;
        break;
      case "만남":
        backgroundColor = theme.colors.primaryRgb;
        break;
      case "매칭":
        backgroundColor = theme.colors.matchingRgb;
        break;
      default:
        backgroundColor = theme.colors.primary;
    }
    return {
      ...styles.alarmItem,
      backgroundColor,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectBar}>
        <View></View>
        <Text style={styles.selectBarTitle}>전체</Text>
        <Image
          style={styles.nextImage}
          source={require("@/assets/images/next.png")}
        />
      </View>
      {notifications?.map((notification, index) => (
        <View style={styles.alarmGroup} key={index}>
          <View
            style={[
              styles.alarmItem,
              getAlarmItemStyle(notification?.category),
            ]}
          >
            <View style={[styles.badge, getBadgeStyle(notification?.category)]}>
              <Text style={styles.badgeTitle}>{notification?.category}</Text>
            </View>
            <Text style={styles.alarmTitle}>{notification?.contents}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    paddingVertical: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: theme.colors.background,
  },
  selectBar: {
    width: responsiveWidth(24),
    height: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colors.black,
  },
  nextImage: {
    width: 12,
    height: 12,
  },
  selectBarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.white,
  },
  alarmGroup: {
    marginTop: 20,
  },
  badge: {
    width: responsiveHeight(6),
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    marginBottom: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  badgeTitle: {
    fontSize: 14,
    color: theme.colors.white,
    fontWeight: "700",
  },
  alarmItem: {
    width: responsiveWidth(90),
    backgroundColor: theme.colors.primaryRgb,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  alarmTitle: {
    fontSize: 14,
    color: theme.colors.white,
  },
});
