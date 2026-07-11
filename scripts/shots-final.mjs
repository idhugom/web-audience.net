import { chromium } from 'playwright-core';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:4321';
const OUT = '/tmp/claude-0/-home-user-web-audience-net/ad916ee7-ccb6-5688-84e3-3399067e59dc/scratchpad';
const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox','--no-proxy-server'] });
async function shot(name, url, { width=1440, height=1000, full=false, mobile=false } = {}) {
  const ctx = await browser.newContext({ viewport:{width,height}, deviceScaleFactor: mobile?2:1.4 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil:'load', timeout:30000 });
  // trigger lazy images by scrolling
  await page.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));} window.scrollTo(0,0); });
  await page.waitForTimeout(900);
  await page.screenshot({ path:`${OUT}/${name}.png`, fullPage: full });
  await ctx.close(); console.log('shot:', name);
}
await shot('F1-home', `${BASE}/`, { full:true });
await shot('F2-article', `${BASE}/comprendre-les-rouages-des-moteurs-de-recherche-pour-optimiser-votre-utilisation-du-web.html/`, { height:1250 });
await shot('F3-thematiques', `${BASE}/thematiques/`, { full:true });
await shot('F4-category', `${BASE}/thematiques/tech-web-numerique/`, { height:1250 });
await shot('F5-mobile', `${BASE}/`, { width:390, height:844, mobile:true });
await browser.close(); console.log('done');
