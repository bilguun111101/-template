import { IS_ANDROID, IS_IOS, IS_NATIVE, IS_WEB } from "#/env/common";
import { Platform } from "react-native";

export function web(value: unknown) {
  if (IS_WEB) return value;
}

export function ios(value: unknown) {
  if (IS_IOS) return value;
}

export function android(value: unknown) {
  if (IS_ANDROID) return value;
}

export function native(value: unknown) {
  if (IS_NATIVE) return value;
}

export const platform = Platform.select;
