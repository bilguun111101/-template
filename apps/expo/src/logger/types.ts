export enum LogContext {
  Default = "logger",
  Session = "session",
  Notifications = "notifications",
  ConversationAgent = "conversation-agent",
  DMsAgent = "dms-agent",
  ReportDialog = "report-dialog",
  PolicyUpdate = "policy-update",

  Metric = "metric",
}

export enum LogLevel {
  Debug = "debug",
  Info = "info",
  Log = "log",
  Warn = "warn",
  Error = "error",
}

export type Transport = (
  level: LogLevel,
  context: LogContext | undefined,
  message: string | Error,
  metadata: Metadata,
  timestamp: number,
) => void;

export type Metadata = {
  [key: string]: Serializable | Error | unknown;

  __context__?: undefined;
  __metadata__?: Record<string, unknown>;
  type?:
    | "default"
    | "error"
    | "debug"
    | "navigation"
    | "http"
    | "query"
    | "info"
    | "transaction"
    | "ui"
    | "user";

  tags?: Record<string, VAR>;
};

export type VAR = string | null | boolean | number | undefined;

export type Serializable =
  | VAR
  | Serializable[]
  | { [key: string]: Serializable };
