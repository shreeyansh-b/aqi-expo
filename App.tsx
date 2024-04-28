import { useEffect } from "react";

import { config } from "@tamagui/config";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { DevToolsBubble } from "react-native-react-query-devtools";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Main } from "./src/Main";

const queryClient = new QueryClient();

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    InterItalic: require("@tamagui/font-inter/otf/Inter-Italic.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <StatusBar style="inverted" backgroundColor="black" />
            <Main />
          </TamaguiProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      {/* <DevToolsBubble /> */}
    </QueryClientProvider>
  );
}
