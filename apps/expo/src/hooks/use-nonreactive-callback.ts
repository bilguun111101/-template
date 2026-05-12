import React from "react";

export function useNonReactiveCallback<T extends (...args: any) => unknown>(
  fn: T,
): T {
  const ref = React.useRef(fn);
  React.useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  return React.useCallback(
    (...args: Parameters<T>) => {
      const latestFn = ref.current;
      return latestFn(...args);
    },
    [ref],
  ) as unknown as T;
}
