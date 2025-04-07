import Header from "@/components/Header";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const itemGroup = [
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
  {
    point: "300",
    discount: "99,000",
    price: "56,000",
  },
];

export default function Point() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="상점" />
      <View style={styles.ownedPointGroup}>
        <Text style={styles.ownedPointTitle}>보유 달란트</Text>
        <View style={styles.ownedPoint}>
          <Text style={styles.ownedPointText}>1000</Text>
        </View>
      </View>
      <View style={styles.itemGroup}>
        {itemGroup.map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.itemPointText}>{item.point}</Text>
            <Text style={styles.itemPointText}>달란트</Text>
            <View style={styles.priceGroup}>
              <Text>{item.discount}</Text>
              <View style={styles.priceButtonGroup}>
                <Text style={styles.priceButtonText}>{item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  ownedPointGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: responsiveHeight(6),
  },
  ownedPoint: {
    paddingLeft: 8,
  },
  ownedPointText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "700",
  },
  ownedPointTitle: {
    color: theme.colors.primaryText,
    fontWeight: "700",
    fontSize: 16,
  },
  itemGroup: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 10,
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    backgroundColor: theme.colors.sub,
    paddingTop: responsiveWidth(8),
    margin: responsiveWidth(2),
  },
  itemPointText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "700",
  },
  priceGroup: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: responsiveWidth(4),
  },
  priceButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(32),
    height: responsiveWidth(8),
    backgroundColor: theme.colors.primary,
    marginTop: responsiveWidth(2),
    borderRadius: 16,
  },
  priceButtonText: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: "700",
  },
});
