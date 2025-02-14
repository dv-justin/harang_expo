import { theme } from "@/constants/Theme";
import { router } from "expo-router";
import React from "react";
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
export default function MeetingGuide() {
  const handleBackClickButton = () => {
    router.back();
  };

  const handleButton = (type: string) => {
    if (type === "back") {
      router.back();
    } else if (type === "meetingGuide") {
      router.push("/plan-overview/meeting-guide");
    } else if (type === "questionList") {
      router.push("/plan-overview/meeting-guide/question-list");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => handleButton("back")}>
        <Image
          style={styles.backImage}
          source={require("@/assets/images/back.png")}
        />
      </Pressable>
      <View style={styles.titleGroup}>
        <Text style={styles.title}>만남 가이드</Text>
      </View>
      <View style={styles.guideGroup}>
        <Text style={styles.guideTitle}>
          최소 5분 전에 만남 장소에 도착해주세요!
        </Text>

        <Text style={styles.guideSubTitle}>
          원활한 만남 진행을 위해 부탁드려요!
        </Text>
      </View>

      <View style={styles.guideGroup}>
        <Text style={styles.guideTitle}>단정한 옷차림으로 부탁드려요!</Text>

        <Text style={styles.guideSubTitle}>좋은 첫인상은 중요하니까요!</Text>
      </View>

      <View style={styles.guideGroup}>
        <Text style={styles.guideTitle}>카페에서 진행되는 소개팅이에요!</Text>

        <Text style={styles.guideSubTitle}>
          상대방과 만남 위치에서 만났다면 편하신 자리에 앉은 후 음료를
          주문해주세요!
        </Text>
      </View>

      <View style={styles.guideGroup}>
        <Text style={styles.guideTitle}>하랑에서 준비한 질문을 통해</Text>
        <Text style={styles.guideTitle}>대화를 이어가보세요!</Text>

        <Text style={styles.guideSubTitle}>
          어색한 분위기를 풀기 위해 하랑에서 준비한 질문을 통해 대화해보세요!
        </Text>

        <Pressable
          style={styles.meetingQuestionButtonGroup}
          onPress={() => handleButton("questionList")}
        >
          <Text style={styles.meetingQuestionButtonTitle}>
            하랑 만남 질문 확인하기
          </Text>
        </Pressable>
      </View>

      <View style={styles.guideGroup}>
        <Text style={styles.guideTitle}>
          만남 완료 후, 애프터 신청 부탁드려요!
        </Text>
        <Text style={styles.guideSubTitle}>
          맘에 든다면, 애프터 신청 해주세요!
        </Text>
        <View style={styles.afterApplicationImageGroup}>
          <Image
            style={styles.afterApplicationImage}
            resizeMode="contain"
            source={require("@/assets/images/after-application.png")}
          />
        </View>
      </View>
    </ScrollView>
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
  titleGroup: {
    marginBottom: responsiveHeight(2),
  },
  title: {
    fontSize: 20,
    color: theme.colors.primaryText,
    fontWeight: "700",
  },
  backImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginBottom: 24,
  },
  guideGroup: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: 24,
  },

  guideTitle: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "700",
  },

  guideSubTitle: {
    color: theme.colors.primaryText,
    fontSize: 14,
    fontWeight: "700",
    paddingTop: 12,
  },
  meetingQuestionButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 10,
    backgroundColor: theme.colors.sub,
    marginTop: 24,
  },
  meetingQuestionButtonTitle: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "700",
  },
  afterApplicationImageGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  afterApplicationImage: {
    width: responsiveWidth(100),
  },
});
