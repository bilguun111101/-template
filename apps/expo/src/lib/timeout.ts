export function timeout(
  cb: () => unknown,
  delay: number,
): ReturnType<typeof setTimeout> {
  return setTimeout(cb, delay);
}
