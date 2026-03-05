import { setupProxy } from '../src/main/proxy';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const rootPath = process.cwd();
const hostPort = 3000;
const servicePort = 3001;
const proxyEndpoint = 'http://localhost:8443';
const supportedInstances = ['Test', 'Train'];

console.log('Starting proxy server for integration tests...');
setupProxy(rootPath, hostPort, servicePort, proxyEndpoint, supportedInstances);
console.log(`Proxy server listening at http://localhost:${hostPort}`);
console.log(`Mock service listening at http://localhost:${servicePort}`);
