import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";
import { theme } from "@/constants/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/common/components/Button";

interface CheckBoxItemProps {
  label: string;
  description: string;
  isChecked: boolean;
  onToggle: () => void;
}

const checkBoxData = [
  {
    label: "나는 미혼입니다.",
    description: "혼인 이력이 있거나 현재 교제 중인 분은 절대 참여불가",
  },
  {
    label: "나는 건강한 교회에 소속된 청년입니다.",
    description:
      "신천지, 다락방 등 이단으로 규정된 단체의 신자는 절대 가입불가",
  },
  {
    label: "나는 진실된 만남을 위해 기도하고 있습니다.",
    description: "상대방을 존중/배려하는 매너를 갖추지 못한 분은 절대 참여불가",
  },
  {
    label: "나는 혼전순결 입니다.",
    description: "결혼 이전에 관계를 원하시는 분은 절대 참여불가",
  },
];

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({
  label,
  description,
  isChecked,
  onToggle,
}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <MaterialIcons name="check" size={18} color="white" />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function EligibilityVerification() {
  const router = useRouter();

  const [checks, setChecks] = useState([false, false, false, false]);
  const [buttonState, setButtonState] = useState(false);

  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const buttonClick = () => {
    setButtonState(true);
    if (checks.includes(false)) {
      return;
    }
    router.push("/auth/sign-up/name");
  };

  return (
    <View style={styles.container}>
      <Text>
        <Text style={[styles.title, styles.mainColor]}>하랑</Text>
        <Text style={[styles.title, styles.subColor]}>
          가입자격을 확인합니다.
        </Text>
      </Text>
      <View style={styles.contents}>
        <View style={styles.container}>
          {checkBoxData.map((item, index) => (
            <CheckBoxItem
              key={index}
              label={item.label}
              description={item.description}
              isChecked={checks[index]}
              onToggle={() => toggleCheck(index)}
            />
          ))}
        </View>

        <Text style={styles.requiredAgreement}>
          {buttonState && checks.includes(false)
            ? "모든 체크박스에 동의 부탁드려요."
            : ""}
        </Text>

        <Pressable style={styles.buttonGroup} onPress={buttonClick}>
          <Button title="다음" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(6),
  },

  title: {
    fontWeight: "700",
    fontSize: responsiveWidth(6),
    paddingVertical: responsiveWidth(2),
  },

  contents: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    borderRadius: 10,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 158, 170, 0.3)", // 배경 색상
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    borderRadius: 10,
  },

  checkbox: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FF9EAA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: responsiveWidth(4),
  },

  checked: {
    backgroundColor: "#FF9EAA",
  },

  textContainer: {
    flex: 1,
  },

  label: {
    fontSize: responsiveWidth(4),
    fontWeight: "bold",
    color: "#333",
    marginBottom: responsiveHeight(1),
  },

  description: {
    fontSize: responsiveWidth(3.6),
    color: "#666",
  },

  requiredAgreement: {
    height: responsiveHeight(7),
    fontSize: responsiveWidth(4),
    fontWeight: "700",
    color: theme.colors.inActiveText,
    paddingBottom: responsiveHeight(1),
  },

  mainColor: {
    color: theme.colors.primary,
  },

  subColor: {
    color: theme.colors.primaryText,
  },
  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(10),
  },
});
