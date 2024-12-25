import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text, Pressable } from "react-native";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Slider from "@react-native-community/slider";
import Button from "@/components/Button";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/user/userAtom";
import { register } from "@/services/auth/api";

export default function IdealType() {
  const router = useRouter();
  const [age, setAge] = useState([23, 30]);
  const [distance, setDistance] = useState(0);
  const [doesNotMatter, setDoesNotMatter] = useState(false);

  const [user, setUser] = useRecoilState(userAtom);

  const handleDoesNotMatter = () => {
    setDoesNotMatter(!doesNotMatter);
  };

  const buttonClick = async () => {
    setUser({
      ...user,
      idealTypeAge: `${age[0]}~${age[1]}`,
      idealTypeDistance: doesNotMatter ? 100 : distance,
    });

    router.push("/pure-intentions");
  };

  return (
    <View style={styles.container}>
      <PageTitle title01="이상형을" title02="설정해주세요" />
      <View>
        <View style={styles.ageGroup}>
          <View style={styles.ageContentGroup}>
            <Text style={styles.title}>나이</Text>
            <Text style={styles.title}>
              {age[0]}세 ~ {age[1]}세 (만 나이)
            </Text>
            <View style={styles.slider}>
              <MultiSlider
                values={age}
                min={20}
                max={45}
                step={1}
                trackStyle={{
                  height: 4,
                }}
                selectedStyle={{
                  backgroundColor: theme.colors.primary,
                }}
                unselectedStyle={{
                  backgroundColor: theme.colors.subText,
                }}
                onValuesChange={(values) => setAge(values)}
                sliderLength={responsiveWidth(72)}
              />
            </View>

            <View style={styles.range}>
              <Text style={styles.rangeText}>20세</Text>
              <Text style={styles.rangeText}>45세</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.distanceGroup}>
          <View style={styles.distanceContentGroup}>
            <Text style={styles.title}>나와의 최대 거리</Text>
            <Text style={styles.title}>{distance}km</Text>
            <Slider
              minimumValue={0}
              maximumValue={50}
              step={10}
              value={distance}
              onValueChange={(value) => setDistance(value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.subText}
              thumbTintColor={theme.colors.white}
            />
            <Pressable
              onPress={handleDoesNotMatter}
              style={
                doesNotMatter
                  ? styles.selectDoesNotMatterGroup
                  : styles.unSelectDoesNotMatterGroup
              }
            >
              <Text
                style={
                  doesNotMatter
                    ? styles.selectDoesNotMatterText
                    : styles.unSelectDoesNotMatterText
                }
              >
                상관없음
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable style={styles.buttonGroup} onPress={buttonClick}>
        <Button title="다음" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  ageGroup: {
    width: responsiveWidth(100) - 44,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    marginTop: responsiveHeight(2),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  ageContentGroup: {
    paddingVertical: responsiveHeight(3),
  },
  distanceGroup: {
    width: responsiveWidth(100) - 44,
    backgroundColor: theme.colors.white,
    marginTop: responsiveHeight(2),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingHorizontal: responsiveWidth(7),
  },
  distanceContentGroup: {
    paddingVertical: responsiveHeight(3),
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "bbbbbb",
    paddingBottom: responsiveHeight(2),
  },

  slider: {
    paddingHorizontal: responsiveWidth(2),
  },

  range: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeText: {
    fontWeight: "700",
    color: theme.colors.subText,
  },

  selectDoesNotMatterGroup: {
    padding: 14,
    backgroundColor: theme.colors.white,
    width: "32%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginTop: 16,
  },
  selectDoesNotMatterText: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primary,
  },

  unSelectDoesNotMatterGroup: {
    padding: 14,
    backgroundColor: theme.colors.white,
    width: "32%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.subText,
    marginTop: 16,
  },
  unSelectDoesNotMatterText: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.subText,
  },
  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop:
      responsiveHeight(100) > 800 ? responsiveHeight(10) : responsiveHeight(4),
  },
});
