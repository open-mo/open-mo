import { io, Socket as SocketIO } from 'socket.io-client';
import { Dictionary } from '../../types';

class Socket {
  id: string;

  socket: SocketIO;

  constructor(url: string) {
    this.socket = io(url, {
      autoConnect: false,
    });
  }

  connect() {
    this.socket.connect();
    this.id = this.socket.id;
    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });
  }

  setAuth(parameters: Dictionary<string>): void {
    this.socket.auth = parameters;
  }

  /**
   * "You're using unknown": Sue me. Found no way around this.
   * [Source](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/socket.io/index.d.ts#L295)
   */
  emit(event: string, ...args: unknown[]): void {
    this.socket.emit(event, ...args);
  }

  /**
   * ????
   * [???](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/socket.io-client/index.d.ts#L82)
   */
  on(event: string, fn: (...args: any[]) => void) {
    this.socket.on(event, fn);
  }
}

export default Socket;
