import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const SRC_DIR = 'C:/Users/jimmy/Downloads';
const OUT_DIR = 'public/images';

const sources = [
  { in: 'RestorationRoofing_Logo_v1.png',      base: 'restoration-roofing-logo-v1' },
  { in: 'RestorationRoofing_Logo_v2.png',      base: 'restoration-roofing-logo-v2' },
  { in: 'RestorationRoofing_Logo_v2white.png', base: 'restoration-roofing-logo-v2-white' },
];

const widths = [400, 800, 1500];

await mkdir(OUT_DIR, { recursive: true });

for (const s of sources) {
  const srcPath = join(SRC_DIR, s.in);
  const meta = await sharp(srcPath).metadata();
  const srcSize = (await stat(srcPath)).size;
  console.log(`\n${s.in}  ${meta.width}x${meta.height}  ${(srcSize/1024).toFixed(1)}KB`);

  for (const w of widths) {
    if (w > meta.width) continue;
    const out = join(OUT_DIR, `${s.base}-${w}.webp`);
    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(out);
    const sz = (await stat(out)).size;
    console.log(`  -> ${out}  ${(sz/1024).toFixed(1)}KB`);
  }
  // Full-size webp (lossless-ish for source-of-truth)
  const fullOut = join(OUT_DIR, `${s.base}.webp`);
  await sharp(srcPath)
    .webp({ quality: 92, effort: 6 })
    .toFile(fullOut);
  const fullSz = (await stat(fullOut)).size;
  console.log(`  -> ${fullOut}  ${(fullSz/1024).toFixed(1)}KB`);
}
