#!/usr/bin/env node

// Corelation Device Service Mock for macOS
// Emulates the Windows background service at https://127.0.0.1:51763
// Zero dependencies — uses only Node.js built-in modules.

import https from 'node:https';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { networkInterfaces } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 51763;
const CERT_DIR = join(__dirname, 'certs');
const CERT_FILE = join(CERT_DIR, 'localhost.crt');
const KEY_FILE = join(CERT_DIR, 'localhost.key');

// Generate self-signed cert on first run
if (!existsSync(CERT_FILE) || !existsSync(KEY_FILE)) {
  mkdirSync(CERT_DIR, { recursive: true });
  const configPath = join(CERT_DIR, 'openssl.cnf');
  writeFileSync(configPath, [
    '[req]',
    'distinguished_name = req_distinguished_name',
    'x509_extensions = v3_req',
    'prompt = no',
    '[req_distinguished_name]',
    'CN = 127.0.0.1',
    '[v3_req]',
    'subjectAltName = IP:127.0.0.1',
  ].join('\n') + '\n');
  execSync(`openssl req -x509 -newkey rsa:2048 -keyout "${KEY_FILE}" -out "${CERT_FILE}" -days 3650 -nodes -config "${configPath}"`);
  console.log('Generated self-signed certificate for 127.0.0.1 (valid 10 years)');
}

function getDeviceId() {
  const net = networkInterfaces();
  const macs = [];
  for (const addrs of Object.values(net)) {
    if (addrs) macs.push(...addrs.map(a => a.mac));
  }
  return macs
    .filter(m => m !== '00:00:00:00:00:00')
    .sort()
    .join(' ')
    .replace(/:/g, '-');
}

const server = https.createServer(
  { key: readFileSync(KEY_FILE), cert: readFileSync(CERT_FILE) },
  (req, res) => {
    // CORS — reflect requesting origin (localhost-only service, safe to allow any)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.url === '/GetDeviceInformation') {
      const macId = getDeviceId();
      res.writeHead(200, { 'Content-Type': 'application/xml' });
      res.end(`<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>MAC: ${macId}</identifier>
  <userServicePortNumber>${PORT}</userServicePortNumber>
  </deviceInformation>
</device>`);
      return;
    }

    res.writeHead(200);
    res.end('okay');
  }
);

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Corelation Service mock running at https://127.0.0.1:${PORT}`);
});
