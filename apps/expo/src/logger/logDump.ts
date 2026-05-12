import { LogContext, LogLevel, Metadata } from "./types";

export type ConsoleTransportEntry = {
  id: string;
  level: LogLevel;
  context: LogContext | undefined;
  timestamp: number;
  message: string | Error;
  metadata: Metadata;
};

let entries: ConsoleTransportEntry[] = [];

export function add(entry: ConsoleTransportEntry) {
  entries.unshift(entry);
  entries = entries.slice(0, 500);
}

export function getEntries() {
  return entries;
}
