export const clamp01 = (value) => Math.min(1, Math.max(0, value));

export const easeInWithSoftOut = (t, inPow, outPow = 1.7, pivot = 0.72) => {
  const x = clamp01(t);
  const easedIn = x ** inPow;
  if (x <= pivot) return easedIn;
  const local = (x - pivot) / (1 - pivot);
  const easedOut = 1 - (1 - local) ** outPow;
  const easedStart = pivot ** inPow;
  return easedStart + (1 - easedStart) * easedOut;
};
