import { theme } from "@/constants/Theme";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function AlarmScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.selectBar}>
        <View></View>
        <Text style={styles.selectBarTitle}>결제</Text>
        <Image
          style={styles.nextImage}
          source={require("@/assets/images/next.png")}
        />
      </View>
      <View style={styles.alarmGroup}>
        <View style={styles.alarmItem}>
          <View style={styles.badge}>
            <Text style={styles.badgeTitle}>결제</Text>
          </View>
          <Text style={styles.alarmTitle}>
            김진수님과 연결되셨습니다 매니저 연락을 기다려주세요
          </Text>
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
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: theme.colors.primaryRgb30,
  },
  selectBar: {
    width: responsiveWidth(24),
    height: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  alarmTitle: {
    fontSize: 14,
  },
});
