import { Socket } from 'socket.io';
import {
  server,
  gameLoop,
} from './server';
import { Character } from './server/classes';
import { Dictionary, UserSocket, Position } from './types';

const users: Dictionary<Character> = {};
const unacknowledgePositions: Dictionary<Array<Position>> = {};

function connectUser(socket: Socket) {
  // TODO: Create a separate class structure to handling explicitly with connected users
  // and contains this Character.
  users[socket.id] = new Character(socket, socket.id, (<UserSocket>socket).username);
}

function broadcastServerSnapshot() {
  Object.keys(unacknowledgePositions).forEach((userID) => {
    const positions = unacknowledgePositions[userID];
    if (positions.length) {
      const nextPosition = positions.shift();
      /**
       * If we have a new snapshot position, we update
       * this local player position to itself
       */
      if (nextPosition) {
        users[userID].position = nextPosition;
        server.to(userID).emit('set local position', nextPosition);
      }
    }
  });

  /**
   * After acknowledgements, we broadcast to everyone the new
   * world snapshot.
   */
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
    // users[id].position.x = position.x;
    // users[id].position.y = position.y;
    // users[id].position.timestamp = position.timestamp;
    if (id in unacknowledgePositions && unacknowledgePositions[id].length > 30) {
      unacknowledgePositions[id].shift();
    } else if (!(id in unacknowledgePositions)) {
      unacknowledgePositions[id] = [];
    }
    unacknowledgePositions[id].push(position);
  });

  socket.on('chat message', (msg) => {
    server.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    delete unacknowledgePositions[socket.id];
  });
});

gameLoop(() => {
  broadcastServerSnapshot();
});
