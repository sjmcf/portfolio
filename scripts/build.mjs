import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await rm(resolve(root, 'dist'), { recursive: true, force: true });
await mkdir(resolve(root, 'dist/public'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'favicon.svg', 'Scramble.png', 'Ancori.png', 'OneTap.png', 'WolfTradeLogoOpenGraph.png', 'public/Sam_McFarland_Resume.pdf', 'public/spectrumiq.jpg', 'public/vanderbilt-logo.png']) {
  await copyFile(resolve(root, file), resolve(root, 'dist', file));
}

// The SDK ships a standalone browser module, so this static site needs no bundler.
const analytics = await readFile(new URL(import.meta.resolve('@vercel/analytics')), 'utf8');
const clientConfig = process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG;
await writeFile(
  resolve(root, 'dist/analytics.js'),
  `${analytics}\n\ninject({ mode: 'production' }, ${JSON.stringify(clientConfig) ?? 'undefined'});\n`,
);
const html = await readFile(resolve(root, 'index.html'), 'utf8');
await writeFile(
  resolve(root, 'dist/index.html'),
  html.replace('  </head>', '    <script type="module" src="/analytics.js"></script>\n  </head>'),
);
console.log('Built portfolio in dist/. Ready for any static web host.');
