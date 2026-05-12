import { LogEvents } from "#/lib/statsig/statsig";
import { type PersistedAccount } from "#/state/persisted";

export type SessionAccount = PersistedAccount;

export type SessionStateContext = {
  currentAccount: SessionAccount | undefined;
  hasSession: boolean;
};

export type SessionApiContext = {
  logoutCurrentAccount: (
    logContext: LogEvents["account:loggedOut"]["logContext"],
  ) => void;
  resumeSession: (account: SessionAccount) => Promise<void>;
  removeAccount: (account: SessionAccount) => void;
  login: (
    props: {
      password: string;
      authFactorToken?: string | undefined;
      service: string;
      identifier: string;
    },
    logContext: LogEvents["account:loggedIn"]["logContext"],
  ) => Promise<void>;
};
