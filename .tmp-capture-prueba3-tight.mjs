import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer';

const server = spawn(process.execPath, ['.tmp-pwa-server.cjs'], {
  cwd: process.cwd(),
  stdio: 'ignore',
});

try {
  await delay(1500);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 864, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4175/prueba3', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'prueba3-tight-pass.png', fullPage: true });
  await browser.close();
} finally {
  server.kill();
}
