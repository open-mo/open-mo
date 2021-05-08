import { Socket } from 'socket.io';

interface Dictionary<T> {
  [Key: string]: T;
}

interface UserSocket extends Socket {
  username: string;
}

export {
  Dictionary,
  UserSocket,
};
