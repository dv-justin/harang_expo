import { theme } from "@/constants/Theme";
import { View, StyleSheet, Text, Pressable } from "react-native";

export default function MyScreen() {
  return (
    <View style={styles.container}>
      <Text>ㅇㄹㅇ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primaryRgb20,
  },
});
