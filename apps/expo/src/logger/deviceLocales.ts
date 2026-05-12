import { isString } from "#/lib";
import { dedupArray } from "#/lib/functions";
import {
  getLocales as defaultGetLocales,
  type Locale,
} from "expo-localization";

type LocalWithLanguageCode = Locale & {
  languageCode: string;
};

export function getLocales() {
  const locales = defaultGetLocales?.() || [];
  const output: LocalWithLanguageCode[] = [];

  for (const locale of locales) {
    if (isString(locale.languageTag)) {
      if (
        locale.languageTag.startsWith("zh-Hans") ||
        locale.languageTag === "zh-CN"
      ) {
        // Simplified Chinese to zh-Hans-CN
        locale.languageTag = "zh-Hans-CN";
      }
      if (
        locale.languageTag.startsWith("zh-Hant") ||
        locale.languageTag === "zh-TW"
      ) {
        // Tradional Chinese to zh-Hant-TW
        locale.languageTag = "zh-Hant-TW";
      }
    }
    // @ts-ignore checked above
    output.push(locale);
  }

  return output;
}

export const deviceLocales = getLocales();

export const deviceLanguageCodes = dedupArray(
  deviceLocales.map((l) => l.languageCode),
);
