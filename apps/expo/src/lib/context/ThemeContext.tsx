import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { darkTheme, defaultTheme, dimTheme } from "../themes";

export type ColorScheme = "dark" | "light";
export type PaletteColorName =
  | "default"
  | "primary"
  | "secondary"
  | "inverted"
  | "error";
export type PaletteColor = {
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  textInverted: string;
  link: string;
  border: string;
  [k: string]: string;
};
export type Palette = Record<PaletteColorName, PaletteColor>;

export enum THEME_NAMES {
  LIGHT = "light",
  DIM = "dim",
  PRIMARY = "primary",
  DARK = "dark",
  PURPLE = "purple",
  GRAY = "gray",
}

export type ShapeName = "button" | "bigButton" | "smallButton";
export type Shapes = Record<ShapeName, ViewStyle>;

export type TypographyVariant =
  | "2xl-thin"
  | "2xl"
  | "2xl-medium"
  | "2xl-bold"
  | "2xl-heavy"
  | "xl-thin"
  | "xl"
  | "xl-medium"
  | "xl-bold"
  | "xl-heavy"
  | "lg-thin"
  | "lg"
  | "lg-medium"
  | "lg-bold"
  | "lg-heavy"
  | "md-thin"
  | "md"
  | "md-medium"
  | "md-bold"
  | "md-heavy"
  | "sm-thin"
  | "sm"
  | "sm-medium"
  | "sm-bold"
  | "sm-heavy"
  | "xs-thin"
  | "xs"
  | "xs-medium"
  | "xs-bold"
  | "xs-heavy"
  | "title-2xl"
  | "title-xl"
  | "title-lg"
  | "title"
  | "title-sm"
  | "post-text-lg"
  | "post-text"
  | "button"
  | "button-lg"
  | "mono";

export type Typography = Record<string, TextStyle>;

export interface Theme {
  colorScheme: ColorScheme;
  palette: Palette;
  shapes: Shapes;
  typography: Typography;
}

export interface ThemeProviderProps {
  children?: React.ReactNode;
  theme: THEME_NAMES;
}

export const ThemeContext = React.createContext<Theme>(defaultTheme);
ThemeContext.displayName = "ThemeContext";

export const useTheme = () => React.useContext(ThemeContext);

function getTheme(theme: THEME_NAMES) {
  switch (theme) {
    case THEME_NAMES.LIGHT:
      return defaultTheme;
    case THEME_NAMES.DIM:
      return dimTheme;
    case THEME_NAMES.DARK:
      return darkTheme;
    default:
      return defaultTheme;
  }
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const themeValue = getTheme(theme);
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
