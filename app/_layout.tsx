import styled, { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, Platform } from "react-native";
import { useEffect } from "react";
import "react-native-reanimated";
import { theme } from "@/constants/Theme";
SplashScreen.preventAutoHideAsync();

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  ${Platform.OS === "android" &&
  `
    padding-top: 20px;
  `}
`;

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaContainer>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaContainer>
    </ThemeProvider>
  );
}
