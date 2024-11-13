import { theme } from "@/constants/Theme";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.matchingState}>
        <Text style={styles.matchingStateSubText}>
          주님의 인연을 기도와 함께 매니저가 찾고 있어요.
        </Text>
        <Text style={styles.matchingStateText}>매칭 해제</Text>
      </View>
      <View style={styles.guide}></View>
      <View style={styles.tieGroup}>
        <Text style={styles.tieTitle}>김진수님, 인연 찾으셨나요?</Text>
        <View style={styles.tie}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primaryRgb20,
    flexDirection: "column",
    paddingLeft: responsiveWidth(5),
  },

  matchingState: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    marginTop: responsiveHeight(4),
    padding: 12,
  },

  matchingStateText: {
    fontSize: responsiveWidth(6),
    fontWeight: "700",
    color: theme.colors.primary,
    paddingTop: responsiveHeight(1.4),
  },

  matchingStateSubText: {
    fontSize: responsiveWidth(3.4),
    color: theme.colors.sub,
    fontWeight: "700",
  },

  guide: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingTop: responsiveHeight(8),
  },

  tieGroup: {
    marginTop: responsiveHeight(4),
  },

  tieTitle: {
    fontSize: responsiveWidth(5.4),
    fontWeight: "700",
    paddingBottom: responsiveHeight(1),
  },

  tie: {
    width: responsiveWidth(90),
    height: responsiveHeight(12),
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
});
