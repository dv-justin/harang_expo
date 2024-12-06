import { theme } from "@/constants/Theme";
import React, { useState } from "react";
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
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import PageTitle from "@/components/PageTitle";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/user/userAtom";

const siRegion = ["서울", "경기", "특별자치/광역시", "일반 광역지자체"];

const seoulRegion = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const gyeonggiDoRegion = [
  "가평군",
  "고양시",
  "과천시",
  "광명시",
  "광주시",
  "구리시",
  "군포시",
  "김포시",
  "남양주시",
  "동두천시",
  "부천시",
  "성남시",
  "수원시",
  "시흥시",
  "안산시",
  "안성시",
  "안양시",
  "양주시",
  "양평군",
  "여주시",
  "연천군",
  "오산시",
  "용인시",
  "의왕시",
  "의정부시",
  "이천시",
  "파주시",
  "평택시",
  "하남시",
  "화성시",
];

const specialAndMetropolitanCities = [
  "광주",
  "대구",
  "대전",
  "부산",
  "세종",
  "울산",
  "인천",
  "제주",
];

const metropolitanRegions = [
  "강원",
  "경남",
  "경북",
  "전남",
  "전북",
  "충남",
  "충북",
];

const overseasRegions = ["해외"];

export default function Region() {
  const router = useRouter();

  const [region, setIsRegion] = useState("");
  const [subRegion, setIsSubRegion] = useState("");
  const [selectSubRegion, setSelectSubRegion] = useState<string[]>(seoulRegion);
  const [selectIndex, setSelectIndex] = useState(0);

  const [user, setUser] = useRecoilState(userAtom);

  const regionButtonClick = (regionValue: string, value: number) => {
    value === 2 ? setIsRegion(regionValue) : setIsSubRegion(regionValue);
    setSelectIndex(value);

    handleBottomSheetValue(regionValue);

    if (value === 3) {
      setUser({
        ...user,
        regionLevel1: region,
        regionLevel2: subRegion,
      });

      setSelectIndex(0);
      router.push("/auth/sign-up/church");
    }
  };

  const handleBottomSheetValue = (region: string) => {
    if (region === "서울") {
      setSelectSubRegion(seoulRegion);
      return;
    } else if (region === "경기") {
      setSelectSubRegion(gyeonggiDoRegion);
      return;
    } else if (region === "특별자치/광역시") {
      setSelectSubRegion(specialAndMetropolitanCities);
      return;
    } else if (region === "일반 광역지자체") {
      setSelectSubRegion(metropolitanRegions);
      return;
    }
    setSelectSubRegion([]);
    return;
  };

  const openBottomSheet = (value: number) => {
    setSelectIndex(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <PageTitle title01="현재 살고 있는 지역을" title02="알려주세요" />
        <View style={styles.contents}>
          <Text style={styles.selectRegionGroup}>
            <Text style={styles.selectRegion}>선택 지역: </Text>
            <Text style={styles.selectRegion}>
              {subRegion && `${region} - ${subRegion}`}
            </Text>
          </Text>

          <Pressable style={styles.content} onPress={() => openBottomSheet(1)}>
            <Text style={styles.contentTitle}>선택</Text>
            <Image source={require("@/assets/images/sign-up/next-white.png")} />
          </Pressable>
        </View>
      </View>
      {selectIndex > 0 && (
        <View style={styles.bottomContentContainer}>
          {selectIndex === 1 && (
            <ScrollView>
              {siRegion.map((region, index) => (
                <Pressable
                  key={index}
                  onPress={() => regionButtonClick(region, 2)}
                >
                  <Text key={index} style={styles.regionText}>
                    {region}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
          {selectIndex === 2 && (
            <ScrollView>
              {selectSubRegion.map((region, index) => (
                <Pressable
                  key={index}
                  onPress={() => regionButtonClick(region, 3)}
                >
                  <Text key={index} style={styles.regionText}>
                    {region}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  main: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(6.4),
    paddingVertical: 4,
  },

  contents: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: responsiveHeight(12),
  },

  selectRegionGroup: {
    paddingBottom: responsiveWidth(2),
  },

  selectRegion: {
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    color: theme.colors.primaryText,
  },

  content: {
    width: responsiveWidth(40),
    height: responsiveHeight(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colors.primaryText,
    padding: responsiveWidth(4),
  },

  contentTitle: {
    color: theme.colors.white,
    fontSize: responsiveWidth(6),
    fontWeight: "700",
  },

  bottomContentContainer: {
    padding: responsiveWidth(10),
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.colors.primaryText,
    height: responsiveHeight(40),
  },

  regionText: {
    fontSize: responsiveWidth(4.5),
    color: "#fff",
    paddingVertical: 8,
    fontWeight: "700",
    paddingBottom: responsiveWidth(4),
  },
});
