import WebSocket from 'ws';

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

export default wss;
