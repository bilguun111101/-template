export function isObject<T>(obj: T): obj is T & Record<string, unknown> {
  return typeof obj === "object" && obj !== null;
}

export function instance<T extends abstract new (...args: any) => any>(
  value: unknown,
  constructor: T,
): value is InstanceType<T> {
  return value instanceof constructor;
}

export function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function isStrArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((e) => isString(e));
}

export function isNum(val: unknown): val is number {
  return typeof val === "number";
}

export function hasProp<K extends PropertyKey>(
  data: object,
  prop: K,
): data is Record<string, unknown> {
  return prop in data;
}
