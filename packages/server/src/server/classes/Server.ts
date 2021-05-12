import { Socket } from 'socket.io';
import { io as serverInstance } from '..';
import { UserSocket } from '../../types';

class Server {
  server;

  constructor() {
    this.server = serverInstance;
    this.init();
  }

  on(identifier: 'connection', listener: (socket: Socket) => void): void {
    this.server.on(identifier, listener);
  }

  init(): void {
    this.server.use((socket, next) => {
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
  }

  /**
   * "You're using unknown": Sue me. Found no way around this.
   * [Source](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/socket.io/index.d.ts#L295)
   */
  emit(event: string, ...args: unknown[]): void {
    this.server.emit(event, ...args);
  }

  sendTo(userID: string, event: string, ...args: unknown[]): void {
    this.server.to(userID).emit(event, ...args);
  }
}

export default Server;
