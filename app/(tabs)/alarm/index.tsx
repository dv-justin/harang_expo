import { theme } from "@/constants/Theme";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
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
  const [selectNotifications, setSelectNotifications] = useState<
    Notification[]
  >([]);
  const [selectGroupStatus, setSelectGroupStatus] = useState<Boolean>(false);
  const [selectItem, setSelectItem] = useState<String>("전체");
  useEffect(() => {
    const socket = io("http://localhost:4001/notifications", {
      transports: ["websocket"],
    });

    socket.on("notifications", (data) => {
      setNotifications(data);
      setSelectNotifications(data);
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

  const handleHeader = () => {
    setSelectGroupStatus(!selectGroupStatus);
  };

  const handleSelectItem = (category: string) => {
    const data = notifications.filter((notification) => {
      if (category === "전체") {
        return true;
      }
      return notification?.category === category;
    });

    setSelectItem(category);
    setSelectNotifications(data);
    setSelectGroupStatus(!selectGroupStatus);
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable style={styles.selectBar} onPress={handleHeader}>
          <View></View>
          <Text style={styles.selectBarTitle}>{selectItem}</Text>
          <Image
            style={styles.nextImage}
            source={require("@/assets/images/next.png")}
          />
        </Pressable>
        <ScrollView>
          {selectNotifications?.map((notification, index) => (
            <View style={styles.alarmGroup} key={index}>
              <View
                style={[
                  styles.alarmItem,
                  getAlarmItemStyle(notification?.category),
                ]}
              >
                <View
                  style={[styles.badge, getBadgeStyle(notification?.category)]}
                >
                  <Text style={styles.badgeTitle}>
                    {notification?.category}
                  </Text>
                </View>
                <Text style={styles.alarmTitle}>{notification?.contents}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {selectGroupStatus && (
        <View style={styles.selectGroup}>
          <Pressable
            style={styles.selectItem}
            onPress={() => handleSelectItem("전체")}
          >
            <Text style={styles.selectItemText}>전체</Text>
            {selectItem === "전체" && (
              <Image
                style={styles.selectImage}
                resizeMode="contain"
                source={require("@/assets/images/check-white.png")}
              />
            )}
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => handleSelectItem("매칭")}
          >
            <Text style={styles.selectItemText}>매칭</Text>
            {selectItem === "매칭" && (
              <Image
                style={styles.selectImage}
                resizeMode="contain"
                source={require("@/assets/images/check-white.png")}
              />
            )}
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => handleSelectItem("만남")}
          >
            <Text style={styles.selectItemText}>만남</Text>
            {selectItem === "만남" && (
              <Image
                style={styles.selectImage}
                resizeMode="contain"
                source={require("@/assets/images/check-white.png")}
              />
            )}
          </Pressable>
          <Pressable
            style={styles.selectItem}
            onPress={() => handleSelectItem("결제")}
          >
            <Text style={styles.selectItemText}>결제</Text>
            {selectItem === "결제" && (
              <Image
                style={styles.selectImage}
                resizeMode="contain"
                source={require("@/assets/images/check-white.png")}
              />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(80),
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
  selectGroup: {
    position: "absolute",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    backgroundColor: theme.colors.primary,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  selectItem: {
    width: responsiveWidth(90),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  selectItemText: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "700",
  },
  selectImage: {
    width: 16,
    height: 16,
  },
});
