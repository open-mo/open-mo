import socket from '../network';
import { addChatMessage } from '../network/dataHandler';

socket.on('chat message', (msg: string) => {
  addChatMessage(msg);
});
