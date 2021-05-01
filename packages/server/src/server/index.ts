import WebSocket from 'ws';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 8080;
const server = https.createServer({
  cert: fs.readFileSync('./fixtures/cert.pem'),
  key: fs.readFileSync('./fixtures/key.pem'),
});

const wss = new WebSocket.Server({
  server,
});

server.listen(PORT);

export default wss;
