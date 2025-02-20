import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";

const itemTarget = {
  meetingCompleted: {
    title: "만남 완료",
    color: "#3AA6B9",
    description: "맘에 드셨다면 애프터 신청 부탁드려요.",
  },
  schedulingTheMeeting: {
    title: "만남 일정 조율 중",
    color: "#23C9F3",
    description: "매니저 연락을 조금만 기다려주세요.",
  },
  meetingConfirmed: {
    title: "만남 확정",
    color: "#0D92F4",
    description: "만남 일정을 확인해주세요.",
  },
};

interface MatchItemProps {
  id: number;
  name: string;
  meetingStatus: number;
  isMyTicket: boolean;
  isMyAfter: boolean;
  isYourAfter: boolean;
}

interface BadgeProps {
  label: string;
  color: string;
}

interface ButtonProps {
  color: string;
  id: number;
  meetingStatus: number;
  isMyTicket: boolean;
  isMyAfter: boolean;
  isYourAfter: boolean;
}

function Badge({ label, color }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function Button({
  color,
  id,
  meetingStatus,
  isMyTicket,
  isMyAfter,
  isYourAfter,
}: ButtonProps) {
  const router = useRouter();

  const getProfile = () => {
    router.push(`/profile/${id}`);
  };

  const handlePlan = () => {
    router.push(`/plan-overview?id=${id}`);
  };

  const handleAfter = () => {
    if (isMyAfter && isYourAfter) {
      router.push("/success-application-after");
      return;
    }
    router.push("/application-after");
  };

  return (
    <>
      {!meetingStatus ? (
        !isMyTicket ? (
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.buttonGroup, { backgroundColor: color }]}
              onPress={getProfile}
            >
              <Text style={styles.buttonTitle}>프로필 확인</Text>
            </Pressable>
            <View style={[styles.buttonGroup, { backgroundColor: color }]}>
              <Text style={styles.buttonTitle}>바로 만나기</Text>
            </View>
          </View>
        ) : (
          isMyTicket && <View></View>
        )
      ) : meetingStatus === 1 ? (
        <View></View>
      ) : meetingStatus === 2 ? (
        <Pressable
          style={[styles.fullButtonGroup, { backgroundColor: color }]}
          onPress={handlePlan}
        >
          <Text style={styles.buttonTitle}>만남 일정 및 가이드</Text>
        </Pressable>
      ) : isMyAfter && !isYourAfter ? (
        <View></View>
      ) : (
        <Pressable
          style={[styles.fullButtonGroup, { backgroundColor: color }]}
          onPress={handleAfter}
        >
          <Text style={styles.buttonTitle}>
            {isMyAfter && isYourAfter ? "연락처 확인하기" : "애프터 신청"}
          </Text>
        </Pressable>
      )}
    </>
  );
}

export default function MatchItem({
  id,
  name,
  meetingStatus,
  isMyTicket,
  isMyAfter,
  isYourAfter,
}: MatchItemProps) {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getBableLabel = () => {
      if (meetingStatus === 1) {
        setLabel(itemTarget?.schedulingTheMeeting?.title);
        setColor(itemTarget?.schedulingTheMeeting?.color);
        setDescription(itemTarget?.schedulingTheMeeting?.description);
      } else if (meetingStatus === 2) {
        setLabel(itemTarget?.meetingConfirmed?.title);
        setColor(itemTarget?.meetingConfirmed?.color);
        setDescription(itemTarget?.meetingConfirmed?.description);
      } else if (meetingStatus === 3) {
        setLabel(itemTarget?.meetingCompleted?.title);
        setColor(itemTarget?.meetingCompleted?.color);

        if (!isMyAfter && !isYourAfter) {
          setDescription(itemTarget?.meetingCompleted?.description);
        } else if (isMyAfter && !isYourAfter) {
          setDescription("상대방의 신청을 조금만 기다려주세요!");
        } else if (!isMyAfter && isYourAfter) {
          setDescription("상대방이 애프터 신청을 보냈어요!");
        } else if (isMyAfter && isYourAfter) {
          setDescription("축하합니다! 상대방과 연결이 되었습니다!");
        }
      }
    };

    getBableLabel();
  }, [meetingStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.main01}>
          <View style={styles.badgeGroup}>
            <Badge label={label} color={color} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.main02}>
          <Image
            style={styles.image}
            source={require("@/assets/images/profile.png")}
          />
        </View>
      </View>
      <Button
        color={color}
        id={id}
        meetingStatus={meetingStatus}
        isMyTicket={isMyTicket}
        isMyAfter={isMyAfter}
        isYourAfter={isYourAfter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    width: responsiveWidth(90),
    marginTop: 16,
  },

  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main01: {
    flexDirection: "column",
  },
  main02: {
    flexDirection: "column",
  },
  badgeGroup: {
    flexDirection: "row",
  },

  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },

  badgeText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "700",
  },

  name: {
    color: theme.colors.primaryText,
    fontSize: 16,
    paddingTop: 8,
  },

  description: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "700",
    paddingTop: 8,
  },
  image: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderRadius: 5,
    opacity: 0.2,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonGroup: {
    width: responsiveWidth(38),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: responsiveHeight(100) > 854 ? 12 : 6,
    borderRadius: 50,
    marginTop: 8,
  },

  fullButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: responsiveHeight(100) > 854 ? 12 : 6,
    borderRadius: 50,
    marginTop: 8,
  },

  buttonTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
