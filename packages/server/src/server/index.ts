import { Server } from 'socket.io';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import gameLoop from './gameLoop';

dotenv.config();

const PORT = 8080;
const server = https.createServer({
  cert: fs.readFileSync('./fixtures/cert.pem'),
  key: fs.readFileSync('./fixtures/key.pem'),
});

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:9000', 'https://localhost:9000', 'https://mmo.lucascoelho.dev'],
    methods: ['GET', 'POST'],
  },
});

server.listen(PORT);

export { io as server, gameLoop };
