const DEVICE_KEY = "fungjai:inside-device:v1";
let memoryDeviceId;

// An installation is a browser profile, not a physical-device fingerprint.
export function getInsideDeviceId() {
  if (memoryDeviceId) return memoryDeviceId;
  try { memoryDeviceId = localStorage.getItem(DEVICE_KEY); } catch { /* Private/storage-restricted browsing. */ }
  if (!memoryDeviceId) {
    memoryDeviceId = globalThis.crypto.randomUUID();
    try { localStorage.setItem(DEVICE_KEY, memoryDeviceId); } catch { /* Stable for this page lifetime only. */ }
  }
  return memoryDeviceId;
}

export function getInsideDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

export function selectInsideArticles(items, identity, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const value = (type) => Number(parts.find(part => part.type === type).value);
  const day = new Date(Date.UTC(value("year"), value("month") - 1, value("day")));
  const dayIndex = (day.getUTCDay() + 6) % 7;
  day.setUTCDate(day.getUTCDate() - dayIndex);
  const key = `${identity}:${day.toISOString().slice(0, 10)}`;
  let seed = [...key].reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 0);
  const random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let result = seed;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(dayIndex * 5, dayIndex * 5 + 5);
}
