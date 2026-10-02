import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await rm(resolve(root, 'dist'), { recursive: true, force: true });
await mkdir(resolve(root, 'dist/public'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'favicon.svg', 'public/Sam_McFarland_Resume.pdf', 'public/spectrumiq.jpg']) {
  await copyFile(resolve(root, file), resolve(root, 'dist', file));
}
console.log('Built portfolio in dist/. Ready for any static web host.');
