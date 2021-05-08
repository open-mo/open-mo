import { Socket } from 'socket.io';
import {
  server,
  gameLoop,
} from './server';
import { Character } from './server/classes';
import { Dictionary, UserSocket } from './types';

const users: Dictionary<Character> = {};

function connectUser(socket: Socket) {
  // TODO: Create a separate class structure to handling explicitly with connected users.
  users[socket.id] = new Character((<UserSocket>socket).username, socket.id);
}

function broadcastServerSnapshot() {
  server.emit('users snapshot', users);
}

server.use((socket, next) => {
  const { nickname } = socket.handshake.auth;
  if (!nickname) {
    return next(new Error('invalid nickname!'));
  }
  /**
     * We have to ignore this so we can implement this middlware as suggested in socket.io
     * documentation
     */
  // eslint-disable-next-line no-param-reassign
  (<UserSocket>socket).username = nickname;
  next();
});

server.on('connection', (socket: Socket) => {
  connectUser(socket);
  server.emit('users', users);

  socket.on('move player', ({ id, position }) => {
    users[id].position.x = position.x;
    users[id].position.y = position.y;
  });

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
