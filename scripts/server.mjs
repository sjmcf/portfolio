import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.jpg': 'image/jpeg' };
const requestedPort = Number(process.env.PORT || 3000);

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end('Method not allowed');
  }
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    const allowed = ['index.html', 'styles.css', 'favicon.svg', 'public/Sam_McFarland_Resume.pdf', 'public/spectrumiq.jpg'];
    const relative = file.slice(root.length + 1).split(sep).join('/');
    if (!file.startsWith(root + sep) || !allowed.includes(relative) || !(await stat(file)).isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end('Not found');
    }
    const contents = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': contents.length, 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${requestedPort} is busy. Try: PORT=3001 npm run dev`);
  } else {
    console.error(error.message);
  }
  process.exitCode = 1;
});

server.listen(requestedPort, '127.0.0.1', () => console.log(`Portfolio ready at http://localhost:${requestedPort}`));
