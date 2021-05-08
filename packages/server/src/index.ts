import { Socket } from 'socket.io';
import {
  server,
  gameLoop,
} from './server';
import { User } from './server/classes';
import { Dictionary, UserSocket } from './types';

const users: Dictionary<User> = {};

function connectUser(socket: Socket) {
  // TODO: Create a separate class structure to handling explicitly with connected users.
  users[socket.id] = new User((<UserSocket>socket).username, socket.id);
}

function broadcastServerSnapshot() {
  // console.log('update!');
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
