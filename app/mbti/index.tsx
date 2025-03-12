import { userAtom } from "@/atoms/user/userAtom";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRecoilState } from "recoil";

enum MbtiInteface {
  E = "E",
  I = "I",
  S = "S",
  N = "N",
  F = "F",
  T = "T",
  P = "P",
  J = "J",
}

export default function Mbti() {
  const router = useRouter();

  const [mbti, setMbti] = useState(["E", "S", "T", "J"]);
  const [user, setUser] = useRecoilState(userAtom);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlMbtiButton = (index: number, value: string) => {
    setMbti((prev) => {
      const updatedMbti = [...prev];
      updatedMbti[index] = value;
      return updatedMbti;
    });
  };

  const handleNextButton = () => {
    if (mbti?.length !== 4) {
      return;
    }
    setUser({
      ...user,
      mbti: mbti.join(""),
    });
    router.push("/profile-image");
  };

  useEffect(() => {
    setMbti(user?.mbti.split(""));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PageTitle title01="MBTI를" title02="선택해주세요" />
        <View style={styles.selectGroup}>
          <Pressable
            style={[
              styles.selectItem,
              mbti[0] === MbtiInteface.E && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(0, MbtiInteface.E)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[0] === MbtiInteface.E && styles.primaryColor,
              ]}
            >
              {MbtiInteface.E}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.selectItem,
              mbti[0] === MbtiInteface.I && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(0, MbtiInteface.I)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[0] === MbtiInteface.I && styles.primaryColor,
              ]}
            >
              {MbtiInteface.I}
            </Text>
          </Pressable>
        </View>

        <View style={styles.selectGroup}>
          <Pressable
            style={[
              styles.selectItem,
              mbti[1] === MbtiInteface.S && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(1, MbtiInteface.S)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[1] === MbtiInteface.S && styles.primaryColor,
              ]}
            >
              {MbtiInteface.S}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.selectItem,
              mbti[1] === MbtiInteface.N && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(1, MbtiInteface.N)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[1] === MbtiInteface.N && styles.primaryColor,
              ]}
            >
              {MbtiInteface.N}
            </Text>
          </Pressable>
        </View>

        <View style={styles.selectGroup}>
          <Pressable
            style={[
              styles.selectItem,
              mbti[2] === MbtiInteface.T && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(2, MbtiInteface.T)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[2] === MbtiInteface.T && styles.primaryColor,
              ]}
            >
              {MbtiInteface.T}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.selectItem,
              mbti[2] === MbtiInteface.F && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(2, MbtiInteface.F)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[2] === MbtiInteface.F && styles.primaryColor,
              ]}
            >
              {MbtiInteface.F}
            </Text>
          </Pressable>
        </View>

        <View style={styles.selectGroup}>
          <Pressable
            style={[
              styles.selectItem,
              mbti[3] === MbtiInteface.J && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(3, MbtiInteface.J)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[3] === MbtiInteface.J && styles.primaryColor,
              ]}
            >
              {MbtiInteface.J}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.selectItem,
              mbti[3] === MbtiInteface.P && styles.selectBorder,
            ]}
            onPress={() => handlMbtiButton(3, MbtiInteface.P)}
          >
            <Text
              style={[
                styles.selectItemText,
                mbti[3] === MbtiInteface.P && styles.primaryColor,
              ]}
            >
              {MbtiInteface.P}
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.buttonGroup} onPress={handleNextButton}>
          <Button title="다음" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 2,
  },
  selectGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: responsiveHeight(4),
  },

  selectItem: {
    width: responsiveWidth(40),
    height: responsiveHeight(10),
    justifyContent: "center",
    alignItems: "center",
  },

  selectBorder: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 10,
  },

  selectItemText: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.black,
  },

  primaryColor: {
    color: theme.colors.primary,
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: responsiveHeight(4),
  },
});
