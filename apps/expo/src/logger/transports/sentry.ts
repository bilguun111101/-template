import { isNetworkError, isString, timeout } from "#/lib";
import {
  addBreadcrumb,
  captureException,
  captureMessage,
  SeverityLevel,
} from "@sentry/react-native";
import { LogLevel, Transport } from "../types";
import { prepareMetadata } from "../util";

export const sentryTransport: Transport = (
  level,
  context,
  message,
  { type, tags, ...metadata },
  timestamp,
) => {
  if (level === LogLevel.Debug) return;

  const meta = {
    __context__: context,
    ...prepareMetadata(metadata),
  };
  let _tags = tags || {};
  _tags = {
    // use `category` to match breadcrumbs
    category: context,
    ...tags,
  };

  /**
   * If a string, report a breadcrumb
   */
  if (isString(message)) {
    const severity = (
      {
        [LogLevel.Debug]: "debug",
        [LogLevel.Info]: "info",
        [LogLevel.Warn]: "warn",
        [LogLevel.Error]: "error",
        [LogLevel.Log]: "log", // Sentry value here is undefined
      } as const
    )[level] as SeverityLevel;

    addBreadcrumb({
      category: context,
      message,
      level: severity,
      data: meta,
      type: type || "default",
      timestamp: timestamp / 1000,
    });

    // Network errors are unnecessary in sentry.
    if (isNetworkError(message)) return;

    /**
     * Send all higher levels with `captureMessage`, with
     * appropriate severity level.
     */
    if (level !== "info") {
      // Defer non-critical messages so they're sent in a batch
      queueMessageForSentry(message, {
        level: severity,
        tags: _tags,
        extra: meta,
      });
    }
  } else {
    /**
     * It's otherwise an Error and should be reported with captureException.
     */
    captureException(message, {
      tags: _tags,
      extra: meta,
    });
  }
};

const queuedMessages: [string, Parameters<typeof captureMessage>[1]][] = [];

let sentrySendTimeout: ReturnType<typeof setTimeout> | null = null;

function queueMessageForSentry(
  message: string,
  captureContext: Parameters<typeof captureMessage>[1],
) {
  queuedMessages.push([message, captureContext]);
  if (!sentrySendTimeout) {
    // Throttle sending messages with a leading delay.
    // so that we can get Sentry out of the critical path.
    sentrySendTimeout = timeout(() => {
      sentrySendTimeout = null;
      sendQueuedMessages();
    }, 7000);
  }
}

function sendQueuedMessages() {
  while (queuedMessages.length > 0) {
    const record = queuedMessages.shift();
    if (record) captureMessage(record[0], record[1]);
  }
}
