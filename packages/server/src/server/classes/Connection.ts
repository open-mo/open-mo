import { Socket } from 'socket.io';
import Server from './Server';

class Connection {
  server: Server

  socket: Socket;

  constructor(server: Server, socket: Socket) {
    this.server = server;
    this.socket = socket;
  }

  /**
   * "You're using unknown": Sue me. Found no way around this.
   * [Source](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/socket.io/index.d.ts#L295)
   */
  emit(event: string, ...args: unknown[]): void {
    this.socket.emit(event, ...args);
  }
}

export default Connection;
