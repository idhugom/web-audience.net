import { chromium } from 'playwright-core';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'https://web-audience-preprod.pages.dev';
const OUT = '/tmp/claude-0/-home-user-web-audience-net/ad916ee7-ccb6-5688-84e3-3399067e59dc/scratchpad';

const PROXY = process.env.HTTPS_PROXY || 'http://127.0.0.1:33711';
const browser = await chromium.launch({
  executablePath: EXE,
  args: ['--no-sandbox', `--proxy-server=${PROXY}`],
});
async function shot(name, url, { width = 1440, height = 1000, full = false, mobile = false } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 2 : 1.5,
    ignoreHTTPSErrors: true, // internal screenshot of our own preprod via the egress proxy
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  await ctx.close();
  console.log('shot:', name);
}

await shot('home-desktop', `${BASE}/`, { full: true });
await shot('article-desktop', `${BASE}/blog/magret-canard-moutarde-2/`, { height: 1200 });
await shot('article-full', `${BASE}/blog/comment-identifier-une-panne-materielle-sur-mon-iphone/`, { full: true });
await shot('thematiques', `${BASE}/thematiques/`, { full: true });
await shot('home-mobile', `${BASE}/`, { width: 390, height: 844, mobile: true, full: true });
await browser.close();
console.log('done');
