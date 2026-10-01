import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://ai-powered-research-agent-0nm3.onrender.com/', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await new Promise(r => setTimeout(r, 10000)); // wait 10 seconds for render to wake up and ui to paint
  await page.screenshot({ path: '../public/assets/research-agent-v2.png' });
  await browser.close();
  console.log("Screenshot saved as research-agent-v2.png");
})();
