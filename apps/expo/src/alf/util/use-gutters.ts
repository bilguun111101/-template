import * as tokens from "#/alf/tokens";
import React from "react";
import { Breakpoint, useBreakpoints } from "../breakpoints";

type Gutter = "compact" | "wide" | "base" | 0;

const gutters: Record<
  Exclude<Gutter, 0>,
  Record<Breakpoint | "default", number>
> = {
  // compact:
  base: {
    default: tokens.space.lg,
    gtMobile: tokens.space.xl,
    gtTablet: tokens.space.xl,
    gtPhone: tokens.space.lg,
  },
  compact: {
    default: tokens.space.sm,
    gtTablet: tokens.space.md,
    gtMobile: tokens.space.md,
    gtPhone: tokens.space.lg,
  },
  wide: {
    gtTablet: tokens.space._3xl,
    default: tokens.space.xl,
    gtMobile: tokens.space._3xl,
    gtPhone: tokens.space.xl,
  },
};

type Gutters = {
  paddingLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
};

export function useGutters([vertical, horizontal]: [Gutter, Gutter]): Gutters;
export function useGutters([all]: [Gutter]): Gutters;
export function useGutters([top, right, bottom, left]: [
  Gutter,
  Gutter,
  Gutter,
  Gutter,
]): Gutters;
export function useGutters([top, right, bottom, left]: Gutter[]) {
  const { activeBreakpoint } = useBreakpoints();
  if (right === undefined) {
    right = bottom = left = top;
  } else if (bottom === undefined) {
    bottom = top;
    left = right;
  }
  return React.useMemo(
    () => ({
      paddingLeft:
        left === 0 ? 0 : gutters[left][activeBreakpoint || "default"],
      paddingRight:
        right === 0 ? 0 : gutters[right][activeBreakpoint || "default"],
      paddingTop: top === 0 ? 0 : gutters[top][activeBreakpoint || "default"],
      paddingBottom:
        bottom === 0 ? 0 : gutters[bottom][activeBreakpoint || "default"],
    }),
    [],
  );
}
