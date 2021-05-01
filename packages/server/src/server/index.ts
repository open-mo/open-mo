import WebSocket from 'ws';

const PORT: number = 8080;
const wss = new WebSocket.Server({ port: PORT });

export default wss;
