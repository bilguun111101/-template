import React from "react";
import { SessionApiContext, SessionStateContext } from "./types";

const StateContext = React.createContext<SessionStateContext>({
  currentAccount: undefined,
  hasSession: false,
});
StateContext.displayName = "SessionStateContext";

const ApiContext = React.createContext<SessionApiContext>({
  async logoutCurrentAccount(_) {},
  async login() {},
  async resumeSession() {},
  async removeAccount() {},
});
ApiContext.displayName = "SessionApiContext";

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const cancelPendingTask = useOneTaskAtATime();
  //   const [] = React.useReducer()

  return <StateContext.Provider value={}>{children}</StateContext.Provider>;
}

function useOneTaskAtATime() {
  const abortController = React.useRef<AbortController | null>(null);
  return React.useCallback(() => {
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();
    return abortController.current.signal;
  }, []);
}
