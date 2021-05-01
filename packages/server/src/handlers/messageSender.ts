const WebSocket = require('ws');
import server from '../server';
import { Packet } from 'types';

function broadcast(message: Packet) {
  server.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export { broadcast };
