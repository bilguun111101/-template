import "#/logger/sentry/setup";
import "#/env";

import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import * as ScreenOrientation from "expo-screen-orientation";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getLocales } from "#/logger/deviceLocales";
import { IS_ANDROID, IS_IOS } from "./env/common";

SplashScreen.preventAutoHideAsync();
if (IS_IOS) SystemUI.setBackgroundColorAsync("black");
if (IS_ANDROID) {
  // iOS is handled by the config plugin -sfn
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export default function App() {
  console.log("function: ", process.env);
  getLocales();
  return (
    <View style={styles.container}>
      <Text>Mobile up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
