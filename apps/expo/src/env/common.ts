import { version } from "#/../package.json";
import { Platform } from "react-native";

export const RELEASE_VERSION = version;

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
export const IS_WEB = Platform.OS === "web";
export const NODE_ENV = process.env.NODE_ENV;
export const IS_NATIVE = (IS_IOS || IS_ANDROID) && !IS_WEB;
