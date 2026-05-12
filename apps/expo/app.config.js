// @ts-check
const pkg = require("./package.json");

/** @type {import('expo/config').ExpoConfig} */
module.exports = () => {
  return {
    name: "aris",
    slug: "aris",
    version: pkg.version,

    orientation: "portrait",
    userInterfaceStyle: "automatic",

    icon: "./assets/icon.png",
    scheme: "aris",

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aris",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      package: "com.aris",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
    },

    web: {
      bundler: "metro",
      output: "single",
    },

    plugins: [
      "expo-localization",
      "expo-splash-screen",
      "expo-image",
      "expo-build-properties",
      "expo-quick-actions",
    ],

    extra: {
      env: process.env.APP_ENV ?? "dev",
      eas: {
        projectId: "6bada6f1-a3cd-4a49-a74e-ee88fbdae137",
      },
    },
    owner: "blguun",
  };
};
