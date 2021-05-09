import { Socket } from 'socket.io';

interface Dictionary<T> {
  [Key: string]: T;
}

interface Position {
  x: number;
  y: number;
  timestamp?: number;
}

interface UserSocket extends Socket {
  username: string;
}

export {
  Dictionary,
  UserSocket,
  Position,
};
