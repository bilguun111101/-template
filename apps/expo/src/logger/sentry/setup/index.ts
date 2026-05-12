import { RELEASE_VERSION } from "#/env/common";
import { init } from "@sentry/react-native";

init({
  enabled: !__DEV__,
  dsn: process.env.EXPO_PUBLIC_SENTRY_AUTH_TOKEN,
  debug: __DEV__,
  release: RELEASE_VERSION,
  enableNative: false,
  ignoreErrors: [
    /*
     * Unknown internals errors
     */
    `t is not defined`,
    `Can't find variable: t`,
    /*
     * Un-useful errors
     */
    `Network request failed`,
  ],
  attachStacktrace: false,
  sampleRate: __DEV__ ? 1.0 : 0.1,
});
