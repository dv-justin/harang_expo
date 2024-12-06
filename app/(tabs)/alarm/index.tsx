import { theme } from "@/constants/Theme";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function AlarmScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.main}></View>
      <View style={styles.selectBar}>
        <Text>아아</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primaryRgb20,
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(84),
  },
  selectBar: {},
});
