import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: [
    "en",
    "en-GB",
    "zh-CN",
    "ko",
    "ja",
    "zh-TW",
    "tr",
    "ru",
    "fr",
    "es",
  ],
  catalogs: [
    {
      path: "<rootDir>/src/locale/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  compileNamespace: "ts",
});
