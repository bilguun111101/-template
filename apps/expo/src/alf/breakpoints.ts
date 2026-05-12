export type Breakpoint = "gtPhone" | "gtMobile" | "gtTablet";

import React from "react";
import { useMediaQuery } from "react-responsive";

export function useBreakpoints(): Record<Breakpoint, boolean> & {
  activeBreakpoint: Breakpoint | undefined;
} {
  const gtPhone = useMediaQuery({ minWidth: 500 });
  const gtMobile = useMediaQuery({ minWidth: 800 });
  const gtTablet = useMediaQuery({ minWidth: 1300 });
  return React.useMemo(() => {
    let active: Breakpoint | undefined;
    if (gtTablet) {
      active = "gtTablet";
    } else if (gtMobile) {
      active = "gtMobile";
    } else if (gtPhone) {
      active = "gtPhone";
    }
    return {
      gtPhone,
      gtTablet,
      activeBreakpoint: active,
      gtMobile,
    };
  }, [gtMobile, gtPhone, gtTablet]);
}

/**
 */
export function useLayoutBreakpoints() {
  const rightNavVisible = useMediaQuery({ minWidth: 1100 });
  const centerColumnOffset = useMediaQuery({ minWidth: 1100, maxWidth: 1300 });
  const leftNavMinimal = useMediaQuery({ maxWidth: 1300 });

  return React.useMemo(
    () => ({
      rightNavVisible,
      leftNavMinimal,
      centerColumnOffset,
    }),
    [leftNavMinimal, rightNavVisible, centerColumnOffset],
  );
}
