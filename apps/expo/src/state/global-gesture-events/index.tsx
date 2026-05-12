import EventEmitter from "eventemitter3";
import React from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
  type GestureStateChangeEvent,
} from "react-native-gesture-handler";

export type GlobalGestureEvents = {
  begin: GestureStateChangeEvent<PanGestureHandlerEventPayload>;
  finalize: GestureStateChangeEvent<PanGestureHandlerEventPayload>;
  update: GestureStateChangeEvent<PanGestureHandlerEventPayload>;
  end: GestureStateChangeEvent<PanGestureHandlerEventPayload>;
};

const GlobalGestureContext = React.createContext<{
  register(): void;
  unregister(): void;
  events: EventEmitter<GlobalGestureEvents>;
}>({
  events: new EventEmitter(),
  unregister() {},
  register() {},
});
GlobalGestureContext.displayName = "GlobalGestureEventsContext";

export function GlobalGestureEventsProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [enabled, setEnabled] = React.useState(false);
  const refCount = React.useRef(0);
  const events = React.useMemo(
    () => new EventEmitter<GlobalGestureEvents>(),
    [],
  );
  const value: React.ContextType<typeof GlobalGestureContext> = React.useMemo(
    () => ({
      register() {
        refCount.current += 1;
        if (refCount.current === 1) setEnabled(true);
      },
      unregister() {
        refCount.current -= 1;
        if (refCount.current === 0) setEnabled(false);
      },
      events,
    }),
    [events],
  );
  const gesturePan = Gesture.Pan()
    .onUpdate((e) => events.emit("update", e))
    .onEnd((e) => events.emit("end", e))
    .onBegin((e) => events.emit("begin", e))
    .onFinalize((e) => events.emit("finalize", e))
    .runOnJS(true)
    .enabled(enabled)
    .simultaneousWithExternalGesture();

  return (
    <GlobalGestureContext.Provider value={value}>
      <GestureDetector gesture={gesturePan}>
        <View collapsable={false}>{children}</View>
      </GestureDetector>
    </GlobalGestureContext.Provider>
  );
}

export function useGlobalGestureEvents() {
  return React.useContext(GlobalGestureContext);
}
