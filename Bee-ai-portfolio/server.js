const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    default: return 'text/plain; charset=utf-8';
  }
}

function sendFile(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(statusCode, { 'Content-Type': contentType(filePath) });
    res.end(data);
  });
}

function buildLocalReply(message) {
  const text = message.toLowerCase();

  if (text.includes('stack') || text.includes('skills') || text.includes('tool')) {
    return 'My stack focuses on Python, TypeScript, Node.js, fast APIs, vector search, and prompt-driven product design. I like building AI products that feel useful from day one.';
  }

  if (text.includes('project') || text.includes('build') || text.includes('ship')) {
    return 'I enjoy shipping focused AI products: landing pages with intelligent agents, internal copilots, and workflow automations that save time instead of adding noise.';
  }

  if (text.includes('contact') || text.includes('email') || text.includes('reach')) {
    return 'You can reach me through the contact section on this site. I am always happy to talk about AI products, personal branding, or prototype ideas.';
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello! I am Bee, an AI builder focused on turning bold ideas into polished products. Ask me about the stack, my brand, or how to get started with agents.';
  }

  return 'I help founders and builders turn AI ideas into real products. Ask me about my stack, my process, or how I think about shipping agent experiences.';
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');

  if (req.method === 'POST' && requestUrl.pathname === '/api/agent') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const message = payload.message || '';
        const reply = buildLocalReply(message);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ reply, mode: 'local' }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ reply: 'I could not process that request.', mode: 'error' }));
      }
    });
    return;
  }

  let filePath = requestUrl.pathname;
  if (filePath === '/') {
    filePath = '/index.html';
  }

  const safePath = path.join(publicDir, filePath);

  if (!safePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  sendFile(res, safePath);
});

server.listen(port, () => {
  console.log(`Bee AI portfolio is running at http://localhost:${port}`);
});
