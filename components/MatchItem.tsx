import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";

const itemTarget = {
  applicationAfter: {
    label: "연결 대기중",
    color: "#3AA6B9",
    description: "상대방이 애프터 신청을 보냈어요.",
  },
  wait: {
    label: "연결 대기중",
    color: "#23C9F3",
    description: "상대방의 신청을 기다려주세요.",
  },
  success: {
    label: "연결 성공",
    color: "#0D92F4",
    description: "축하드려요! 연락처를 확인해주세요.",
  },
};

interface MatchItemProps {
  id: number;
  name: string;
  meetingStatus: number;
  isMyTicket: boolean;
  isYourTicket: boolean;
  allTicketsUsedBy: boolean;
  yourUserId: number;
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
  isYourTicket: boolean;
  allTicketsUsedBy: boolean;
  yourUserId: number;
}

interface DataProps {
  label: string;
  color: string;
  description: string;
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
  isYourTicket,
  allTicketsUsedBy,
  yourUserId,
}: ButtonProps) {
  const router = useRouter();

  const handleProfile = () => {
    if (!isMyTicket && isYourTicket && allTicketsUsedBy) {
      router.push(`/profile?id=${yourUserId}&type=received`);
      return;
    }

    router.push(`/profile?id=${yourUserId}&type=my`);
  };

  return (
    <>
      {isMyTicket && isYourTicket ? (
        <Pressable
          style={[styles.fullButtonGroup, { backgroundColor: color }]}
          // onPress={handlePlan}
        >
          <Text style={styles.buttonTitle}>연락처 확인</Text>
        </Pressable>
      ) : isMyTicket || isYourTicket ? (
        <Pressable
          style={[styles.fullButtonGroup, { backgroundColor: color }]}
          onPress={handleProfile}
        >
          <Text style={styles.buttonTitle}>프로필 확인</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
    </>
  );
}

export default function MatchItem({
  id,
  name,
  meetingStatus,
  isMyTicket,
  isYourTicket,
  allTicketsUsedBy,
  yourUserId,
}: MatchItemProps) {
  const [data, setData] = useState<DataProps>();

  useEffect(() => {
    const getBableLabel = () => {
      if (isMyTicket && isYourTicket) {
        setData(itemTarget.success);
      } else if (isMyTicket && !isYourTicket) {
        setData(itemTarget?.wait);
      } else if (isYourTicket) {
        setData(itemTarget?.applicationAfter);
      }
    };

    getBableLabel();
  }, [meetingStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.main01}>
          <View style={styles.badgeGroup}>
            <Badge label={data?.label!} color={data?.color!} />
            {!isMyTicket && isYourTicket && allTicketsUsedBy ? (
              <Badge label="무료 연결" color="#4CAF50" />
            ) : (
              <View></View>
            )}
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{data?.description!}</Text>
        </View>
        <View style={styles.main02}>
          <Image
            style={styles.image}
            source={require("@/assets/images/profile.png")}
          />
        </View>
      </View>
      <Button
        color={data?.color!}
        id={id}
        meetingStatus={meetingStatus}
        isMyTicket={isMyTicket}
        isYourTicket={isYourTicket}
        allTicketsUsedBy={allTicketsUsedBy}
        yourUserId={yourUserId}
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
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 5,
    opacity: 0.8,
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
