import { Socket } from 'socket.io';
import {
  server,
  gameLoop,
} from './server';
import { Dictionary } from './types';

const users: Dictionary<Socket> = {};

function connectUser(socket: Socket) {
  // TODO: Create a separate class structure to handling explicitly with connected users.
  users[socket.id] = socket;
}

function broadcastServerSnapshot() {
  // console.log('update!');
}

server.on('connection', (socket: Socket) => {
  connectUser(socket);

  socket.on('chat message', (msg) => {
    server.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
  });
});

gameLoop(() => {
  broadcastServerSnapshot();
});
