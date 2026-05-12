import { findSupportedAppLanguage } from "#/locale/helpers";
import { logger } from "#/logger";
import { deviceLanguageCodes, deviceLocales } from "#/logger/deviceLocales";
import { z } from "zod";

/**
 */
const accountSchema = z.object({
  email: z.string().optional(),
  emailConfirmed: z.boolean().optional(),
  emailAuthFactor: z.boolean().optional(),
  accessJwt: z.string().optional(),
  refreshJwt: z.string().optional(),
  signupQueued: z.boolean().optional(),
});
export type PersistedAccount = z.infer<typeof accountSchema>;

const schema = z.object({
  colorMode: z.enum(["dark", "light", "system"]),
  darkTheme: z.enum(["dim", "dark"]).optional(),
  session: z.object({
    accounts: z.array(accountSchema),
  }),
  reminders: z.object({
    lastEmailConfirm: z.string().optional(),
  }),
  languagePrefs: z.object({
    primaryLanguage: z.string(),
    contentLanguages: z.array(z.string()),
    appLanguage: z.string(),
  }),
  onboarding: z.object({
    step: z.string(),
  }),
});
export type Schema = z.infer<typeof schema>;

export const defaults: Schema = {
  colorMode: "system",
  darkTheme: "dim",
  languagePrefs: {
    primaryLanguage: deviceLanguageCodes[0] || "en",
    contentLanguages: deviceLanguageCodes || [],
    appLanguage: findSupportedAppLanguage([
      deviceLocales.at(0)?.languageTag,
      deviceLanguageCodes[0],
    ]),
  },
  session: {
    accounts: [],
  },
  reminders: {
    lastEmailConfirm: undefined,
  },
  onboarding: {
    step: "Home",
  },
};

export function tryParse(rawData: string): Schema | undefined {
  let oldData;
  try {
    oldData = JSON.parse(rawData);
  } catch (e) {
    logger.error("persisted state: failed to parse root state from storage", {
      message: e,
    });
  }

  if (!oldData) return undefined;
  const parsed = schema.safeParse(oldData);

  if (parsed.success) {
    return oldData;
  }
  const errors = parsed.error.issues.map((e) => ({
    code: e.code,
    messsage: e.message,
    path: e.path.join("."),
  }));
  logger.error(`persisted store: data failed validation on read`, { errors });
  return undefined;
}

export function tryStringfy(value: Schema): string | undefined {
  try {
    schema.parse(value);
    return JSON.stringify(value);
  } catch (e) {
    logger.error(`persisted store: failed stringfying root state`, {
      message: e,
    });
  }
}
