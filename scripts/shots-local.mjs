import { chromium } from 'playwright-core';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:4321';
const OUT = '/tmp/claude-0/-home-user-web-audience-net/ad916ee7-ccb6-5688-84e3-3399067e59dc/scratchpad';
const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox','--no-proxy-server'] });
async function shot(name, url, { width=1440, height=1000, full=false, mobile=false } = {}) {
  const ctx = await browser.newContext({ viewport:{width,height}, deviceScaleFactor: mobile?2:1.5 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil:'load', timeout:30000 });
  await page.waitForTimeout(700);
  await page.screenshot({ path:`${OUT}/${name}.png`, fullPage: full });
  await ctx.close(); console.log('shot:', name);
}
await shot('01-home-desktop', `${BASE}/`, { full:true });
await shot('02-article', `${BASE}/blog/magret-canard-moutarde-2/`, { height:1300 });
await shot('03-article-full', `${BASE}/blog/comment-identifier-une-panne-materielle-sur-mon-iphone/`, { full:true });
await shot('04-thematiques', `${BASE}/thematiques/`, { full:true });
await shot('05-blog', `${BASE}/blog/`, { height:1200 });
await shot('06-home-mobile', `${BASE}/`, { width:390, height:844, mobile:true, full:true });
await browser.close(); console.log('done');
