#!/usr/bin/env node

import net from "node:net";
import { spawn } from "node:child_process";

const port = Number(process.env.RN_METRO_PORT || 8081);

const withTimeout = (promise, ms) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    promise
      .then((value) => resolve(value))
      .catch(() => resolve(null))
      .finally(() => clearTimeout(timer));
  });

async function isMetroRunning(targetPort) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1200);
  try {
    const response = await fetch(`http://127.0.0.1:${targetPort}/status`, {
      signal: controller.signal,
    });
    const text = await response.text();
    return text.includes("packager-status:running");
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function isPortOpen(targetPort) {
  return withTimeout(
    new Promise((resolve) => {
      const socket = new net.Socket();
      socket.once("connect", () => {
        socket.destroy();
        resolve(true);
      });
      socket.once("error", () => resolve(false));
      socket.connect(targetPort, "127.0.0.1");
    }),
    1200,
  );
}

const metroRunning = await isMetroRunning(port);
if (metroRunning) {
  console.log(`Metro ya esta corriendo en http://localhost:${port}.`);
  process.exit(0);
}

const portOpen = await isPortOpen(port);
if (portOpen) {
  console.error(
    `El puerto ${port} esta ocupado por otro proceso (no Metro). Libera el puerto o usa RN_METRO_PORT.`,
  );
  process.exit(1);
}

const child =
  process.platform === "win32"
    ? spawn(
        "cmd.exe",
        [
          "/d",
          "/s",
          "/c",
          `npm run start -w @apps/referidos-android -- --port ${port} --reset-cache`,
        ],
        {
          stdio: "inherit",
          shell: false,
          env: { ...process.env },
        },
      )
    : spawn(
        "npm",
        ["run", "start", "-w", "@apps/referidos-android", "--", "--port", String(port), "--reset-cache"],
        {
          stdio: "inherit",
          shell: false,
          env: { ...process.env },
        },
      );

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
