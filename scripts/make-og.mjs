import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff"/><stop offset="1" stop-color="#eff6ff"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#2563eb"/><stop offset="1" stop-color="#06b6d4"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#2563eb" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1050" cy="90" r="320" fill="#06b6d4" opacity="0.08"/>
  <circle cx="120" cy="560" r="260" fill="#2563eb" opacity="0.08"/>
  <g transform="translate(90,110)">
    <rect x="0" y="0" width="86" height="86" rx="24" fill="url(#brand)"/>
    <g stroke="#fff" stroke-width="3.6" fill="none" opacity="0.95" transform="translate(43,43) scale(2.2) translate(-20,-20)">
      <circle cx="20" cy="20" r="10.5"/>
      <path d="M9.5 20h21M20 9.5c3 3 4.5 6.7 4.5 10.5S23 27.5 20 30.5c-3-3-4.5-6.7-4.5-10.5S17 12.5 20 9.5Z"/>
    </g>
    <text x="112" y="58" font-family="Space Grotesk, Arial, sans-serif" font-size="46" font-weight="700" letter-spacing="-1">
      <tspan fill="#0f172a">web</tspan><tspan fill="#06b6d4">-</tspan><tspan fill="#2563eb">audience</tspan>
    </text>
  </g>
  <text x="90" y="360" font-family="Space Grotesk, Arial, sans-serif" font-size="72" font-weight="700" fill="#0f172a" letter-spacing="-2">Le web, décrypté.</text>
  <text x="92" y="420" font-family="Inter, Arial, sans-serif" font-size="30" fill="#475569">Guides complets, comparatifs et réponses claires</text>
  <text x="92" y="462" font-family="Inter, Arial, sans-serif" font-size="30" fill="#475569">pour comprendre et agir en ligne.</text>
  <rect x="90" y="520" width="1020" height="6" rx="3" fill="url(#brand)"/>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og-default.png', import.meta.url), png);
console.log('og-default.png written', png.length, 'bytes');
