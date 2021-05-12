import { Server as SocketIOServer } from 'socket.io';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import { Server } from './classes';
import gameLoop from './gameLoop';

dotenv.config();

const PORT = 8080;
const httpsServer = https.createServer({
  cert: fs.readFileSync('./fixtures/cert.pem'),
  key: fs.readFileSync('./fixtures/key.pem'),
});

const io = new SocketIOServer(httpsServer, {
  cors: {
    /**
     * Localhost for local development;
     * last two for itch.io
     */
    origin: ['http://localhost:9000', 'https://localhost:9000', 'https://v6p9d9t4.ssl.hwcdn.net', 'http://v6p9d9t4.ssl.hwcdn.net'],
    methods: ['GET', 'POST'],
  },
});

const server = new Server();

httpsServer.listen(PORT);

export { server, io, gameLoop };
