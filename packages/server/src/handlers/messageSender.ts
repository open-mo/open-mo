import WebSocket from 'ws';
import { Packet } from 'types';
import server from '../server';

function broadcast(message: Packet): void {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export { broadcast };
