const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1536, height: 2200, deviceScaleFactor: 1 } });
  try {
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:4175/figma-prototype?ts=" + Date.now(), { waitUntil: "networkidle0" });
    const data = await page.evaluate(() => {
      const el = document.querySelector('.figma-prototype__promo-stack-blur');
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        cssWidth: cs.width,
        cssHeight: cs.height,
        left: cs.left,
        top: cs.top,
        rect: { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom },
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        opacity: cs.opacity,
        filter: cs.filter,
        mixBlendMode: cs.mixBlendMode,
      };
    });
    console.log(JSON.stringify(data, null, 2));
  } finally {
    await browser.close();
  }
})();
