import { UserWebSocket } from './types';
import server from './server';
import { handleMessageData } from './handlers';

server.on('connection', (ws: UserWebSocket) => {
  ws.on('message', (message: string) => {
    // FIXME: This log is for debug purposes. Should be removed later, of course.
    // eslint-disable-next-line no-console
    console.log('msg received:', message);
    handleMessageData(ws, message);
  });
});
