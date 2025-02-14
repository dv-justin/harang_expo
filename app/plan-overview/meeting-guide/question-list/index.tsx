import { theme } from "@/constants/Theme";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function QuestionList() {
  const [startQuestion, setStartQuestion] = useState(false);
  const [faithQuestion, setFaithQuestion] = useState(false);
  const [dailyQuestion, setdailyQuestion] = useState(false);
  const handleButton = (type: string) => {
    if (type === "back") {
      router.back();
    }
  };

  const handleQuestion = (type: string) => {
    if (type === "startQuestion") {
      setStartQuestion(!startQuestion);
    } else if (type === "faithQuestion") {
      setFaithQuestion(!faithQuestion);
    } else if (type === "dailyQuestion") {
      setdailyQuestion(!dailyQuestion);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleButton("back")}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </Pressable>
      <View style={styles.titleGroup}>
        <Text style={styles.title}>만남 질문 리스트</Text>
      </View>
      <ScrollView>
        <Pressable
          style={styles.questionGroup}
          onPress={() => handleQuestion("startQuestion")}
        >
          <View style={styles.questionHeaderGroup}>
            <Text style={styles.questionHeaderTitle}>처음 대화 시작 질문</Text>
            <Image
              style={styles.downArrowImage}
              resizeMode="contain"
              source={require("@/assets/images/down-arrow.png")}
            />
          </View>
          {startQuestion && (
            <View style={styles.questionListGroup}>
              <Text style={styles.questionItemTitle}>
                1. 오시는데 불편함은 없으셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                2. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                3. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                4. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                5. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                6. 하나님을 어떻게 만나셨나요?
              </Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={styles.questionGroup}
          onPress={() => handleQuestion("faithQuestion")}
        >
          <View style={styles.questionHeaderGroup}>
            <Text style={styles.questionHeaderTitle}>신앙 관련 질문</Text>
            <Image
              style={styles.downArrowImage}
              resizeMode="contain"
              source={require("@/assets/images/down-arrow.png")}
            />
          </View>
          {faithQuestion && (
            <View style={styles.questionListGroup}>
              <Text style={styles.questionItemTitle}>
                1. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                2. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                3. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                4. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                5. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                6. 하나님을 어떻게 만나셨나요?
              </Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={styles.questionGroup}
          onPress={() => handleQuestion("dailyQuestion")}
        >
          <View style={styles.questionHeaderGroup}>
            <Text style={styles.questionHeaderTitle}>일상 관련 질문</Text>
            <Image
              style={styles.downArrowImage}
              resizeMode="contain"
              source={require("@/assets/images/down-arrow.png")}
            />
          </View>
          {dailyQuestion && (
            <View style={styles.questionListGroup}>
              <Text style={styles.questionItemTitle}>
                1. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                2. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                3. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                4. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                5. 하나님을 어떻게 만나셨나요?
              </Text>
              <Text style={styles.questionItemTitle}>
                6. 하나님을 어떻게 만나셨나요?
              </Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
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
  backImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginBottom: 24,
  },
  titleGroup: {
    marginBottom: responsiveHeight(2),
  },
  title: {
    fontSize: 20,
    color: theme.colors.primaryText,
    fontWeight: "700",
  },
  questionGroup: {
    width: responsiveWidth(90),
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 18,
    marginBottom: responsiveHeight(2),
  },
  questionHeaderGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.white,
  },
  questionListGroup: {
    marginTop: 12,
  },
  questionItemTitle: {
    fontSize: 16,
    color: theme.colors.white,
    paddingBottom: 8,
  },
  downArrowImage: {
    width: 16,
    height: 16,
  },
});
