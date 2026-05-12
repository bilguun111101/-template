import { add } from "./logDump";
import { LogContext, LogLevel, Metadata, Transport } from "./types";
import { nanoid } from "nanoid/non-secure";
import { enabledLogLevels } from "./util";
import { NODE_ENV } from "#/env/common";
import { consoleTransport, sentryTransport } from "./transports";

const TRANSPORTS: Transport[] = (function configureTransport() {
  switch (NODE_ENV) {
    case "production": {
      return [sentryTransport].filter(Boolean);
    }
    case "test": {
      return [];
    }
    default: {
      return [consoleTransport];
    }
  }
})();

export class Logger {
  static Level = LogLevel;
  static Context = LogContext;

  level: LogLevel;
  context?: LogContext = undefined;
  contextFilter: string = "";
  ambientMetadata: Record<string, unknown> = {};

  protected debugContextRegexes: RegExp[] = [];
  protected transports: Transport[] = [];

  public static instance(
    context?: LogContext,
    metadata: Record<string, unknown> = {},
  ) {
    const logger = new Logger({
      context,
      metadata,
      level: process.env.Expo_PUBLIC_LOGLEVEL as LogLevel,
      contextFilter: process.env.EXPO_PUBLIC_LOG_DEBUG || "",
    });
    for (const transport of TRANSPORTS) logger.addTransport(transport);
    return logger;
  }

  constructor({
    level,
    context,
    contextFilter,
    metadata: ambientMetadata = {},
  }: {
    level?: LogLevel;
    context?: LogContext;
    contextFilter?: string;
    metadata?: Record<string, unknown>;
  } = {}) {
    this.context = context;
    this.level = level || LogLevel.Info;
    this.contextFilter = contextFilter || "";
    this.ambientMetadata = ambientMetadata;
    if (this.contextFilter) this.level = LogLevel.Debug;
    this.debugContextRegexes = (this.contextFilter || "")
      .split(",")
      .map(
        (filter) =>
          new RegExp(filter.replace(/[^\w:*-]/, "").replace(/\*/g, ".*")),
      );
  }

  debug(message: string, metadata: Metadata = {}) {
    this.transport({ level: LogLevel.Debug, message, metadata });
  }

  info(message: string, metadata: Metadata = {}) {
    this.transport({ level: LogLevel.Info, message, metadata });
  }

  log(message: string, metadata: Metadata = {}) {
    this.transport({ level: LogLevel.Log, message, metadata });
  }

  warn(message: string, metadata: Metadata = {}) {
    this.transport({ level: LogLevel.Warn, message, metadata });
  }

  error(message: string, metadata: Metadata = {}) {
    this.transport({ level: LogLevel.Error, metadata, message });
  }

  addTransport(transport: Transport) {
    this.transports.push(transport);
    return () => {
      this.transports.splice(this.transports.indexOf(transport), 1);
    };
  }

  protected transport({
    level,
    message,
    metadata = {},
  }: {
    level: LogLevel;
    message: string | Error;
    metadata: Metadata;
  }) {
    if (
      level === LogLevel.Debug &&
      Boolean(this.context) &&
      Boolean(this.contextFilter) &&
      !this.debugContextRegexes.find((reg) => reg.test(this.context!))
    )
      return;

    const timestamp = Date.now();
    const meta: Metadata = {
      __metadata__: this.ambientMetadata,
      ...metadata,
    };

    // send every log to syslog
    add({
      id: nanoid(),
      level,
      metadata: meta,
      timestamp,
      message,
      context: this.context,
    });

    if (!enabledLogLevels[this.level].includes(level)) return;

    for (const transport of this.transports) {
      transport(level, this.context, message, meta, timestamp);
    }
  }
}

export const logger = Logger.instance(Logger.Context.Default);
