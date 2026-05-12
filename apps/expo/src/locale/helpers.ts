import { APP_LANGUAGE_TYPES } from "./languages";

export const sanitizeAppLanguageSetting = (appLanguage: string) => {
  const langs = appLanguage.split(",").filter(Boolean);
  const set = new Set<APP_LANGUAGE_TYPES | string>(
    Object.values(APP_LANGUAGE_TYPES),
  );

  for (const lang of langs)
    if (set.has(lang)) return lang as APP_LANGUAGE_TYPES;
  return APP_LANGUAGE_TYPES.en;
};

/**
 * Find the first language supported by our translation infra.
 *     {@link APP_LANGUAGE_TYPES}
 *
 * If no match, return en.
 */

export function findSupportedAppLanguage(languageTags: (string | undefined)[]) {
  const supported = new Set(Object.values(APP_LANGUAGE_TYPES));
  for (const tag of languageTags) {
    if (!tag) continue;
    if (supported.has(tag as APP_LANGUAGE_TYPES)) return tag;
  }
  return APP_LANGUAGE_TYPES.en;
}
