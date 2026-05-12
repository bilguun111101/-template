import { parse } from "bcp-47";
import { Schema } from "./schema";
import { dedupArray } from "#/lib/functions";
import { logger } from "#/logger";
import { instance } from "#/lib";

export function normalizeData(data: Schema) {
  const next = { ...data };

  /**
   *
   */
  try {
    const langPrefs = { ...next.languagePrefs };
    langPrefs.primaryLanguage = normalizeLanguageTagToTwoLetterCode(
      langPrefs.primaryLanguage,
    );
    langPrefs.contentLanguages = dedupArray(
      langPrefs.contentLanguages.map((l) =>
        normalizeLanguageTagToTwoLetterCode(l),
      ),
    );
  } catch (e) {
    let message;
    if (instance(e, Error)) message = e.message;
    else {
      message = e;
    }
    logger.error(`persisted state: failed to normalize language prefs`, {
      safeMessage: message,
    });
  }

  return next;
}

export function normalizeLanguageTagToTwoLetterCode(lang: string) {
  const result = parse(lang).language;
  return result || lang;
}
