import WebSocket from 'ws';

const PORT: number = 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('msg received:', message);
    });

    ws.send('[server]: im aware of your connection :)');
});
