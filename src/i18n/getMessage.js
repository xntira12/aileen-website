export function getMessage(messages, key, fallback = "") {
  if (!key) return fallback;
  const parts = key.split(".");
  let cur = messages;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return fallback;
    cur = cur[part];
  }
  return cur ?? fallback;
}

export function createTranslator(messages) {
  return (key, fallback) => getMessage(messages, key, fallback ?? key);
}
