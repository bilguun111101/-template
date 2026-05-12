import { IS_WEB } from "#/env/common";
import { LogLevel, Transport } from "../types";

import { format } from "date-fns";
import { prepareMetadata } from "../util";
import { instance } from "#/lib";

/**
 * Used in dev mode to nicely log to the console
 */
export const consoleTransport: Transport = (
  level,
  context,
  message,
  metadata,
  timestamp,
) => {
  const hasMetadata = Object.keys(metadata).length;

  if (IS_WEB) {
    const cssColor = {
      [LogLevel.Debug]: "magenta",
      [LogLevel.Error]: "red",
      [LogLevel.Info]: "dodgerblue",
      [LogLevel.Warn]: "orange",
      [LogLevel.Log]: "green",
    }[level];

    const timestampStr = format(timestamp, "HH:mm:ss");
    const contextStr = context ? ` (${context})` : "";
    const messageStr = message ? ` (${message.toString()})` : "";

    const styledPart = `%c${timestampStr}${contextStr}%c${messageStr}`;
    const styles = [`color: ${cssColor}; font-weight: bold`, `color: inherit`];

    if (hasMetadata) {
      console.groupCollapsed(styledPart, ...styles);
      console.log(prepareMetadata(metadata));
      console.groupEnd();
    } else {
      console.log(styledPart, ...styles);
    }

    if (instance(message, Error)) {
      // for stacktrace
      console.error(message);
    }
  } else {
    const colorize = withColor(
      {
        [LogLevel.Error]: colors.red,
        [LogLevel.Info]: colors.blue,
        [LogLevel.Log]: colors.green,
        [LogLevel.Warn]: colors.yellow,
        [LogLevel.Debug]: colors.magenta,
      }[level],
    );

    let msg = `${colorize(format(timestamp, "HH:mm:ss"))}`;
    if (context) msg += ` ${colorize(`(${context})`)}`;
    if (message) msg += ` ${colorize(`(${message})`)}`;
    if (hasMetadata)
      msg += ` ${JSON.stringify(prepareMetadata(metadata), null, 2)}`;
    console.log(msg);
    if (instance(message, Error)) {
      // for stacktrace
      console.error(message);
    }
  }
};

const colors: Record<string, [number, number]> = {
  default: [0, 0],
  blue: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
};

function withColor([x, y]: [number, number]) {
  const rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  const open = `\x1b[${x}m`;
  const close = `\x1b[${y}m`;

  return (text: string) => {
    if (text == null) return text;

    return (
      open +
      (~("" + text).indexOf(close) ? text.replace(rgx, close + open) : text) +
      close
    );
  };
}
