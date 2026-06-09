// Tiny static server so ANIMA runs on http://localhost (a secure context),
// which the browser requires for live system/microphone audio capture.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(fileURLToPath(import.meta.url), '..');
const port = 8080;
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.mjs':'text/javascript' };

http.createServer(async (req, res) => {
  try {
    const rel = (req.url === '/' ? '/index.html' : req.url.split('?')[0]);
    const data = await readFile(join(dir, decodeURIComponent(rel)));
    res.writeHead(200, { 'content-type': types[extname(rel)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
}).listen(port, () => console.log('ANIMA → http://localhost:' + port));
