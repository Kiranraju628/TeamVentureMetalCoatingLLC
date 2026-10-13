const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function saveSubmission(filename, item) {
  const targetFile = path.join(DATA_DIR, filename);
  let list = [];
  try {
    if (fs.existsSync(targetFile)) {
      list = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    }
  } catch (e) {
    list = [];
  }
  list.unshift(item);
  fs.writeFileSync(targetFile, JSON.stringify(list, null, 2), 'utf8');
  return list;
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // 1. API: Submit / Retrieve RFQ
  if (reqUrl === '/api/rfq') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          data.id = data.id || ('RFQ-' + Date.now());
          data.receivedAt = new Date().toISOString();
          saveSubmission('rfqs.json', data);

          console.log('\n  ==============================================================');
          console.log('   [NEW RFQ LOGGED - EMAIL NOTIFICATION TARGET: info@tvmcservices.com]');
          console.log(`   ID:        ${data.id}`);
          console.log(`   Client:    ${data.name || data.company || 'N/A'}`);
          console.log(`   Phone:     ${data.phone || 'N/A'}`);
          console.log(`   Email:     ${data.email || 'N/A'}`);
          console.log(`   Service:   ${data.service || 'N/A'}`);
          console.log(`   Material:  ${data.material || 'N/A'}`);
          console.log(`   Scope:     ${data.notes || data.scope || 'N/A'}`);
          console.log('  ==============================================================\n');

          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: true, message: 'RFQ saved successfully', rfq: data }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
        }
      });
      return;
    } else if (req.method === 'GET') {
      const targetFile = path.join(DATA_DIR, 'rfqs.json');
      const content = fs.existsSync(targetFile) ? fs.readFileSync(targetFile, 'utf8') : '[]';
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
      return;
    }
  }

  // 2. API: Submit Contact Inquiry
  if (reqUrl === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        data.id = data.id || ('MSG-' + Date.now());
        data.receivedAt = new Date().toISOString();
        saveSubmission('contacts.json', data);

        console.log('\n  ==============================================================');
        console.log('   [NEW CONTACT MESSAGE - EMAIL TARGET: info@tvmcservices.com]');
        console.log(`   ID:      ${data.id}`);
        console.log(`   From:    ${data.name || 'N/A'} <${data.email || 'N/A'}>`);
        console.log(`   Message: ${data.message || 'N/A'}`);
        console.log('  ==============================================================\n');

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, message: 'Message saved successfully' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqUrl);

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    const ips = getLocalIpAddresses();
    console.log('\n  ==============================================================');
    console.log('   TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)');
    console.log('  ==============================================================');
    console.log(`\n  ➜  Local:   http://localhost:${port}/`);
    ips.forEach(ip => {
      console.log(`  ➜  Network: http://${ip}:${port}/   (Open on Mobile & Tablet!)`);
    });
    console.log('\n  Ready for Desktop, Tablet & Mobile testing.');
    console.log('  Press Ctrl+C to stop the server.\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`\n  [!] Port ${port} is currently busy, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
