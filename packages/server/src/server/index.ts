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
    /**
     * Localhost for local development;
     * lat two for itch.io
     */
    origin: ['http://localhost:9000', 'https://localhost:9000', 'https://v6p9d9t4.ssl.hwcdn.net', 'http://v6p9d9t4.ssl.hwcdn.net'],
    methods: ['GET', 'POST'],
  },
});

server.listen(PORT);

export { io as server, gameLoop };
