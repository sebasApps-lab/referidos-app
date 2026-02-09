const MAX_PER_MINUTE = 40;
const PERFORMANCE_SAMPLING = 0.2;
const FLUSH_SIZE = 10;
const FLUSH_INTERVAL_MS = 5000;

function nowMinuteKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}-${now.getUTCMinutes()}`;
}

export function createMobileObservabilityClient({ api, baseContext = {} }) {
  let queue = [];
  let timer = null;
  let minuteKey = nowMinuteKey();
  let countInMinute = 0;
  let flushInProgress = false;

  function resetMinuteIfNeeded() {
    const key = nowMinuteKey();
    if (key !== minuteKey) {
      minuteKey = key;
      countInMinute = 0;
    }
  }

  function canSend(category) {
    resetMinuteIfNeeded();
    if (category === "performance" && Math.random() > PERFORMANCE_SAMPLING) {
      return false;
    }
    if (countInMinute >= MAX_PER_MINUTE) return false;
    countInMinute += 1;
    return true;
  }

  async function flush() {
    if (flushInProgress || queue.length === 0) return;
    flushInProgress = true;
    const batch = queue.slice(0, FLUSH_SIZE);
    queue = queue.slice(FLUSH_SIZE);
    await Promise.allSettled(batch.map((event) => api.logs.logEvent(event)));
    flushInProgress = false;
    if (queue.length > 0) scheduleFlush();
  }

  function scheduleFlush() {
    if (timer) return;
    timer = setTimeout(async () => {
      timer = null;
      await flush();
    }, FLUSH_INTERVAL_MS);
  }

  async function track(event) {
    if (!event?.category || !event?.level || !event?.message) return;
    if (!canSend(event.category)) return;

    const payload = {
      ...event,
      context: {
        ...baseContext,
        ...(event.context || {}),
      },
      created_at: new Date().toISOString(),
    };
    queue.push(payload);
    if (event.level === "error" || event.level === "fatal" || queue.length >= FLUSH_SIZE) {
      await flush();
      return;
    }
    scheduleFlush();
  }

  async function shutdown() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    await flush();
  }

  return { track, flush, shutdown };
}
