import { Socket } from 'socket.io';
import { Position } from '../../types';

class Character {
  id: string;

  nickname = '';

  position: Position = {
    x: 0,
    y: 0,
    timestamp: 0,
  }

  constructor(socket: Socket, id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
  }
}

export default Character;
