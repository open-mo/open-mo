import WebSocket from 'ws';
import { UserWebSocket } from './types';
import server from './server';
import { handleMessageData } from './handlers';

server.on('connection', (ws: UserWebSocket) => {
    ws.on('message', (message: string) => {
        console.log('msg received:', message);
        handleMessageData(ws, message);
    });
});
