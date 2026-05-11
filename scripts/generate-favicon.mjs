// Generate a complete favicon set from the WakeMark SVG (black rounded square with an upward arrow).
// Run once: `node scripts/generate-favicon.mjs`
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");
await mkdir(publicDir, { recursive: true });

// WakeMark: black rounded square + upward arrow. Bigger viewBox (256) for crisp rendering.
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect x="8" y="8" width="240" height="240" rx="56" fill="#0E0E10" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
  <path d="M128 72 L128 184 M128 72 L88 112 M128 72 L168 112"
        stroke="#F4F4F5" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svgBuffer).resize(size, size).png().toFile(resolve(publicDir, name));
  console.log(`✓ ${name} (${size}×${size})`);
}

// favicon.ico = 32×32 PNG renamed (modern browsers accept this).
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(resolve(publicDir, "favicon.ico"));
console.log("✓ favicon.ico (32×32 PNG)");

// site.webmanifest
const manifest = {
  name: "WakeApp",
  short_name: "WakeApp",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#0A0A0B",
  background_color: "#0A0A0B",
  display: "standalone",
};
await writeFile(resolve(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
console.log("✓ site.webmanifest");

// SVG version for vector-aware browsers.
await writeFile(resolve(publicDir, "favicon.svg"), svg);
console.log("✓ favicon.svg");
