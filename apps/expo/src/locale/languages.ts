export enum APP_LANGUAGE_TYPES {
  en = "en",
  en_GB = "en-GB",
  es = "es",
  fr = "fr",
  ru = "ru",
  zh_CN = "zh-CN",
  zh_TW = "zh-TW",
  ja = "ja",
  tr = "tr",
  ko = "ko",
}

type IAppLanguageConfig = {
  code: APP_LANGUAGE_TYPES;
  name: string;
};

export const APP_LANGUAGES: IAppLanguageConfig[] = [
  { code: APP_LANGUAGE_TYPES.ja, name: "日本語 – Japanese" },
  { code: APP_LANGUAGE_TYPES.zh_TW, name: "繁體中文 – Traditional Chinese" },
  { code: APP_LANGUAGE_TYPES.en, name: "English" },
  { code: APP_LANGUAGE_TYPES.zh_CN, name: "简体中文 – Simplified Chinese" },
  { code: APP_LANGUAGE_TYPES.ko, name: "한국어 – Korean" },
  { code: APP_LANGUAGE_TYPES.ru, name: "русский – Russian" },
  { code: APP_LANGUAGE_TYPES.tr, name: "Türkçe – Turkish" },
  { code: APP_LANGUAGE_TYPES.en_GB, name: "British English" },
  { code: APP_LANGUAGE_TYPES.es, name: "español – Spanish" },
  { code: APP_LANGUAGE_TYPES.fr, name: "français – French" },
];
