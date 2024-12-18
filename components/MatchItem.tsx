import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const itemTarget = {
  waitingForConnection: {
    title: "연결 대기중",
    color: "#ADD899",
    description: {
      wait: "상대방 선택을 기다려주세요.",
      connect: "바로 만남이 가능해요!",
    },
  },
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
    color: "#F3CD23",
    description: "만남 일정을 확인해주세요.",
  },
  isFaled: {
    title: "연결 실패",
    color: "#909196",
    description: "상대방과의 연결이 성사되지 않았어요.",
  },
};

interface MatchItemProps {
  name: string;
  gender: string;
  manUserTicketUsed: boolean;
  femaleUserTicketUsed: boolean;
  meetingStatus: number;
  checkTicket: boolean;
  isFailed: boolean;
}

interface BadgeProps {
  label: string;
  color: string;
  checkTicket: boolean;
}

interface ButtonProps {
  gender: string;
  color: string;
  meetingStatus: number;
  manUserTicketUsed: boolean;
  femaleUserTicketUsed: boolean;
}

function Badge({ label, color, checkTicket }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function Button({
  gender,
  color,
  meetingStatus,
  manUserTicketUsed,
  femaleUserTicketUsed,
}: ButtonProps) {
  return (
    <>
      {!meetingStatus ? (
        (gender === "man" && !manUserTicketUsed) ||
        (gender === "female" && !femaleUserTicketUsed) ? (
          <View style={styles.buttonContainer}>
            <View style={[styles.buttonGroup, { backgroundColor: color }]}>
              <Text style={styles.buttonTitle}>프로필 확인</Text>
            </View>
            <View style={[styles.buttonGroup, { backgroundColor: color }]}>
              <Text style={styles.buttonTitle}>바로 만나기</Text>
            </View>
          </View>
        ) : (
          ((gender === "man" && manUserTicketUsed) ||
            (gender === "female" && femaleUserTicketUsed)) && <View></View>
        )
      ) : meetingStatus === 1 ? (
        <View></View>
      ) : meetingStatus === 2 ? (
        <View style={[styles.fullButtonGroup, { backgroundColor: color }]}>
          <Text style={styles.buttonTitle}>일정 확인</Text>
        </View>
      ) : (
        <View style={[styles.fullButtonGroup, { backgroundColor: color }]}>
          <Text style={styles.buttonTitle}>애프터 신청</Text>
        </View>
      )}
    </>
  );
}

export default function MatchItem({
  name,
  gender,
  manUserTicketUsed,
  femaleUserTicketUsed,
  meetingStatus,
  checkTicket,
  isFailed,
}: MatchItemProps) {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getBableLabel = () => {
      if (isFailed) {
        setLabel(itemTarget?.isFaled?.title);
        setColor(itemTarget?.isFaled?.color);
        setDescription(itemTarget?.isFaled?.description);
      } else if (!meetingStatus) {
        setLabel(itemTarget?.waitingForConnection?.title);
        setColor(itemTarget?.waitingForConnection?.color);

        setDescription(
          (gender === "man" && !manUserTicketUsed) ||
            (gender === "female" && !femaleUserTicketUsed)
            ? itemTarget?.waitingForConnection?.description?.connect
            : itemTarget?.waitingForConnection?.description?.wait
        );
      } else if (meetingStatus === 1) {
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
        setDescription(itemTarget?.meetingCompleted?.description);
      }
    };

    getBableLabel();
  }, [meetingStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.main01}>
          <View style={styles.badgeGroup}>
            <Badge label={label} color={color} checkTicket={checkTicket} />
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
        gender={gender}
        meetingStatus={meetingStatus}
        manUserTicketUsed={manUserTicketUsed}
        femaleUserTicketUsed={femaleUserTicketUsed}
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
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 8,
  },

  fullButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 8,
  },

  buttonTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
