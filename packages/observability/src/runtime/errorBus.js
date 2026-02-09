function createBus() {
  const listeners = new Set();

  function emit(event) {
    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch {
        // Listener failures must not break the bus.
      }
    });
  }

  function subscribe(listener) {
    if (typeof listener !== "function") return () => {};
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    emit,
    subscribe,
    size: () => listeners.size,
  };
}

const BUS_SINGLETON_KEY = "__referidos_observability_error_bus__";
const globalScope = globalThis;

if (!globalScope[BUS_SINGLETON_KEY]) {
  globalScope[BUS_SINGLETON_KEY] = createBus();
}

export const errorBus = globalScope[BUS_SINGLETON_KEY];
