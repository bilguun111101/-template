const NETWORK_ERRORS = [
  "Abort",
  "Network request failed",
  "Failed to fetch",
  "Load failed",
  "Upstream service unreachable",
  "NetworkError when attempting to fetch resource",
];

export function isNetworkError(e: unknown) {
  const str = String(e);
  for (const err of NETWORK_ERRORS) {
    if (str.includes(err)) return true;
  }
  return false;
}
