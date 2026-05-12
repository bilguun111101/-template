export type { PersistedAccount, Schema } from "#/state/persisted/schema";
export { defaults } from "#/state/persisted/schema";
import EventEmitter from "eventemitter3";
import { defaults, tryParse, tryStringfy, type Schema } from "./schema";
import { normalizeData } from "./util";
import { PersistedApi } from "./types";
import BroadcaseChannel from "#/lib/broadcast/stub";

const ARIS_STORAGE = "ARIS_STORAGE";

const broadcast = new BroadcaseChannel("ARIS_BROADCAST_CHANNEL");
const UPDATE_EVENT = "ARIS_UPDATE";

let _state: Schema = defaults;
const _emitter = new EventEmitter();

export async function init() {
  const stored = readFromStorage();
  if (stored) _state = stored;
}
init satisfies PersistedApi["init"];

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key];
}
get satisfies PersistedApi["get"];

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K],
): Promise<void> {
  const next = readFromStorage();
  if (next) {
    _state = next;
  }

  try {
    if (JSON.stringify({ v: _state[key] }) === JSON.stringify({ v: value })) {
      return;
    }
  } catch (error) {
    // Ignore and go through the normal path.
  }
  _state = normalizeData({
    ..._state,
    [key]: value,
  });
  writeToStorage(_state);
}

write satisfies PersistedApi["write"];

function writeToStorage(value: Schema) {
  const rawData = tryStringfy(value);
  if (rawData) {
    try {
      localStorage.setItem(ARIS_STORAGE, rawData);
    } catch (error) {
      // Excepted on the web in private mode.
    }
  }
}

let lastRawData: string | undefined;
let lastResult: Schema | undefined;
function readFromStorage(): Schema | undefined {
  let rawData: string | null = null;
  try {
    rawData = localStorage.getItem(ARIS_STORAGE);
  } catch (e) {
    // Excepted on the web in private mode.
  }
  if (!rawData) return undefined;
  if (rawData === lastRawData) return lastResult;
  const parsed = tryParse(rawData);
  if (!parsed) return undefined;
  lastRawData = rawData;
  lastResult = normalizeData(parsed);
  return lastResult;
}
