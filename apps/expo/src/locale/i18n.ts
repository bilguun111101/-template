import "@formatjs/intl-locale/polyfill-force";
import "@formatjs/intl-pluralrules/polyfill-force";
import "@formatjs/intl-numberformat/polyfill-force";
import "@formatjs/intl-displaynames/polyfill-force";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-displaynames/locale-data/en";

import defaultLocale from "date-fns/locale/en-US";
import { i18n } from "@lingui/core";
import { APP_LANGUAGE_TYPES } from "./languages";
import { messages as messagesJa } from "#/locale/locales/ja/messages";
import { messages as messagesEn } from "#/locale/locales/en/messages";
import { messages as messagesEnGB } from "#/locale/locales/en-GB/messages";
import { messages as messagesFr } from "#/locale/locales/fr/messages";
import { messages as messagesKo } from "#/locale/locales/ko/messages";
import { messages as messagesTr } from "#/locale/locales/tr/messages";
import { messages as messagesRu } from "#/locale/locales/ru/messages";
import { messages as messagesZhCN } from "#/locale/locales/zh-CN/messages";
import { messages as messagesZhTW } from "#/locale/locales/zh-TW/messages";
import { messages as messagesEs } from "#/locale/locales/es/messages";
import { useEffect, useState } from "react";
import { sanitizeAppLanguageSetting } from "./helpers";

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: APP_LANGUAGE_TYPES) {
  switch (locale) {
    case APP_LANGUAGE_TYPES.ja: {
      i18n.loadAndActivate({ locale, messages: messagesJa });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/ja"),
        import("@formatjs/intl-pluralrules/locale-data/ja.js"),
        import("@formatjs/intl-numberformat/locale-data/ja.js"),
        import("@formatjs/intl-displaynames/locale-data/ja.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.en: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/en-US"),
        import("@formatjs/intl-pluralrules/locale-data/en.js"),
        import("@formatjs/intl-numberformat/locale-data/en.js"),
        import("@formatjs/intl-displaynames/locale-data/en.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.en_GB: {
      i18n.loadAndActivate({ locale, messages: messagesEnGB });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/en-GB"),
        import("@formatjs/intl-pluralrules/locale-data/en.js"),
        import("@formatjs/intl-numberformat/locale-data/en.js"),
        import("@formatjs/intl-displaynames/locale-data/en.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.es: {
      i18n.loadAndActivate({ locale, messages: messagesEs });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/es"),
        import("@formatjs/intl-pluralrules/locale-data/es.js"),
        import("@formatjs/intl-numberformat/locale-data/es.js"),
        import("@formatjs/intl-displaynames/locale-data/es.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.fr: {
      i18n.loadAndActivate({ locale, messages: messagesFr });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/fr"),
        import("@formatjs/intl-pluralrules/locale-data/fr.js"),
        import("@formatjs/intl-numberformat/locale-data/fr.js"),
        import("@formatjs/intl-displaynames/locale-data/fr.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.ko: {
      i18n.loadAndActivate({ locale, messages: messagesKo });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/ko"),
        import("@formatjs/intl-pluralrules/locale-data/ko.js"),
        import("@formatjs/intl-numberformat/locale-data/ko.js"),
        import("@formatjs/intl-displaynames/locale-data/ko.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.ru: {
      i18n.loadAndActivate({ locale, messages: messagesRu });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/ru"),
        import("@formatjs/intl-pluralrules/locale-data/ru.js"),
        import("@formatjs/intl-numberformat/locale-data/ru.js"),
        import("@formatjs/intl-displaynames/locale-data/ru.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.tr: {
      i18n.loadAndActivate({ locale, messages: messagesTr });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/tr"),
        import("@formatjs/intl-pluralrules/locale-data/tr.js"),
        import("@formatjs/intl-numberformat/locale-data/tr.js"),
        import("@formatjs/intl-displaynames/locale-data/tr.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.zh_CN: {
      i18n.loadAndActivate({ locale, messages: messagesZhCN });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/zh-CN"),
        import("@formatjs/intl-pluralrules/locale-data/zh.js"),
        import("@formatjs/intl-numberformat/locale-data/zh.js"),
        import("@formatjs/intl-displaynames/locale-data/zh.js"),
      ]);
      return dateLocale;
    }
    case APP_LANGUAGE_TYPES.zh_TW: {
      i18n.loadAndActivate({ locale, messages: messagesZhTW });
      // @ts-ignore
      const [{ default: dateLocale }] = await Promise.all([
        import("date-fns/locale/zh-TW"),
        import("@formatjs/intl-pluralrules/locale-data/zh.js"),
        import("@formatjs/intl-numberformat/locale-data/zh.js"),
        import("@formatjs/intl-displaynames/locale-data/zh.js"),
      ]);
      return dateLocale;
    }
    default: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      return defaultLocale;
    }
  }
}

// export function useLocaleLanguage() {
//   const [dateLocale, setDateLocale] = useState(defaultLocale);

//   useEffect(() => {
//     dynamicActivate(sanitizeAppLanguageSetting(appLanguage)).then((locale) => {
//       setDateLocale(locale || defaultLocale);
//     });
//   }, []);

//   return dateLocale;
// }
