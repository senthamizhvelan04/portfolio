import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/portfolio/', { waitUntil: 'networkidle0', timeout: 30000 });
  
  const style = await page.evaluate(() => {
    const wrapper = document.querySelector('.eve-3d-wrapper');
    const container = document.querySelector('.eve-3d-container');
    const btn = document.querySelector('.eve-say-hi-btn');
    if (!wrapper) return "NO WRAPPER";
    const wStyle = window.getComputedStyle(wrapper);
    const cStyle = window.getComputedStyle(container);
    const bStyle = window.getComputedStyle(btn);
    return `Wrapper: pos=${wStyle.position}, gridArea=${wStyle.gridArea} | Container: width=${cStyle.width}, height=${cStyle.height}, display=${cStyle.display} | Btn: pos=${bStyle.position}`;
  });
  console.log("CSS Check:", style);
  
  await browser.close();
})();
