import { hasProp } from "#/lib";

import { jwtDecode } from "jwt-decode";
import { SessionAccount } from "./types";
import { logger } from "#/logger";

export function isSignupQueued(accessJwt: string | undefined) {
  if (accessJwt) {
    const sessData = jwtDecode(accessJwt);
    return hasProp(sessData, "scope") && sessData.scope;
  }
  return false;
}
export function isSessionExpired(account: SessionAccount) {
  try {
    if (account.accessJwt) {
      const decoded = jwtDecode(account.accessJwt);
      if (decoded.exp) {
        const sessionExpired = Date.now() >= decoded.exp * 1_000;
        return sessionExpired;
      }
    }
  } catch (e) {
    logger.error(`session: couldn't decode jwt`);
  }
  return true;
}
