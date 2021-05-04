import { v4 as uuidv4 } from 'uuid';
import {
  server,
  gameLoop,
} from './server';
import { UserWebSocket, Dictionary } from './types';
import { handleMessageData } from './handlers';

const users: Dictionary<UserWebSocket> = {};
const usersToUpdate: Array<string> = [];

function connectUser(ws: UserWebSocket) {
  const user: UserWebSocket = ws;
  const uuid = uuidv4();
  user.id = uuid;
  user.inputs = [];
  users[uuid] = user;
}

function processUsersData() {
  usersToUpdate.forEach((userID) => {
    const ws = users[userID];
    ws.inputs?.forEach((message) => {
      handleMessageData(ws, message);
      ws.inputs.shift();
    });
    usersToUpdate.shift();
  });
}

server.on('connection', (ws: UserWebSocket) => {
  connectUser(ws);

  ws.on('message', (message: string) => {
    users[ws.id].inputs.push(message);
    usersToUpdate.push(ws.id);
  });

  ws.on('close', () => {
    delete users[ws.id];
  });
});

gameLoop((delta) => {
  console.log('delta:', delta);
  processUsersData();
});
