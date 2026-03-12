import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: { width: 1536, height: 864, deviceScaleFactor: 1 },
});

try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4173/prueba4', { waitUntil: 'networkidle0' });

  const pill = await page.$('.prueba4-speed-switch');
  if (!pill) {
    throw new Error('No se encontro .prueba4-speed-switch');
  }

  await pill.screenshot({ path: 'pill-prueba4-latest.png' });

  const details = await page.evaluate(() => {
    const container = document.querySelector('.prueba4-speed-switch');
    const active = document.querySelector('.prueba4-speed-switch button.is-active');
    if (!(container instanceof HTMLElement) || !(active instanceof HTMLElement)) {
      return null;
    }
    const c = getComputedStyle(container);
    const a = getComputedStyle(active);
    return {
      containerOverflow: c.overflow,
      containerRadius: c.borderRadius,
      activeRadius: a.borderRadius,
      activeBg: a.backgroundImage,
      activeBoxShadow: a.boxShadow,
      activeRect: active.getBoundingClientRect().toJSON(),
      containerRect: container.getBoundingClientRect().toJSON(),
    };
  });

  console.log(JSON.stringify(details, null, 2));
} finally {
  await browser.close();
}
