import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { theme } from "@/constants/Theme";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary, // 활성 탭 색상
        tabBarInactiveTintColor: "#ccc",
        tabBarLabelStyle: {
          fontSize: responsiveWidth(4), // 원하는 폰트 크기로 설정
          fontWeight: "bold", // 폰트 굵기 설정 (선택 사항)
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tie/index"
        options={{
          title: "인연",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alarm/index"
        options={{
          title: "알림",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "alarm" : "alarm-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my/index"
        options={{
          title: "마이",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
