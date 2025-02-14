import { userAtom } from "@/atoms/user/userAtom";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import { theme } from "@/constants/Theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Image, Alert } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import * as ImagePicker from "expo-image-picker";
import { useRecoilState } from "recoil";
import { updateUser } from "@/services/user/api";

export default function Profile() {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string[]>(["", "", "", ""]);
  const [user, setUser] = useRecoilState(userAtom);

  const pickImageFromGallery = async (index: number) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("권한 필요", "갤러리 접근을 허용해주세요.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage((prevState) => {
        const newProfileImage = [...prevState];
        newProfileImage[index] = result.assets[0].uri;
        return newProfileImage;
      });
    }
  };

  const buttonClick = async () => {
    if (profileImage[0] === "" || profileImage[1] === "") {
      return;
    }

    setUser({
      ...user,
      profileImage: profileImage,
    });

    if (user?.status === "반려") {
      try {
        await updateUser(user);
        router.push("/approval-pending");
        return;
      } catch (error) {
        router.push("/error");
        return;
      }
    }

    router.push("/ideal-type");
  };

  return (
    <View style={styles.container}>
      <PageTitle title01="프로필 사진을" title02="등록해주세요" />
      <View style={styles.main}>
        <Text style={styles.tipTitle}>
          얼굴이 선명하게 보이는 사진이어야 합니다.
        </Text>
        <View style={styles.selectImageGroup}>
          <View style={styles.essentialSelectImageGroup}>
            <Pressable onPress={() => pickImageFromGallery(0)}>
              {profileImage[0] ? (
                <Image
                  style={styles.selectImage}
                  source={{ uri: profileImage[0] }}
                />
              ) : (
                <View style={styles.essentialSelectImage}>
                  <Text style={styles.selectImageText}>필수</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => pickImageFromGallery(1)}>
              {profileImage[1] ? (
                <Image
                  style={styles.selectImage}
                  source={{ uri: profileImage[1] }}
                />
              ) : (
                <View style={styles.essentialSelectImage}>
                  <Text style={styles.selectImageText}>필수</Text>
                </View>
              )}
            </Pressable>
          </View>

          <View style={styles.essentialSelectImageGroup}>
            <Pressable onPress={() => pickImageFromGallery(2)}>
              {profileImage[2] ? (
                <Image
                  style={styles.selectImage}
                  source={{ uri: profileImage[2] }}
                />
              ) : (
                <View style={styles.optionSelectImage}>
                  <Text style={styles.selectImageText}>선택</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => pickImageFromGallery(3)}>
              {profileImage[3] ? (
                <Image
                  style={styles.selectImage}
                  source={{ uri: profileImage[3] }}
                />
              ) : (
                <View style={styles.optionSelectImage}>
                  <Text style={styles.selectImageText}>선택</Text>
                </View>
              )}
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
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 2,
  },

  main: {
    flexDirection: "column",
    alignItems: "center",
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    paddingTop: responsiveHeight(2),
    color: theme.colors.primaryText,
  },

  selectImageGroup: {
    paddingTop: responsiveHeight(2),
  },

  essentialSelectImageGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  selectImage: {
    width: responsiveWidth(40),
    height: responsiveWidth(44),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },

  essentialSelectImage: {
    width: responsiveWidth(40),
    height: responsiveWidth(44),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },

  optionSelectImage: {
    width: responsiveWidth(40),
    height: responsiveWidth(44),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.subText,
    borderRadius: 10,
    marginHorizontal: responsiveWidth(4),
  },

  selectImageText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "700",
  },

  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginTop:
      responsiveHeight(100) > 800 ? responsiveHeight(12) : responsiveHeight(4),
  },
});
