import * as PIXI from 'pixi.js';
import { Socket } from 'socket.io-client';
import { Vector } from './constants';
import { Position } from '../types';
import socket from '../../network';

class GameObject {
  id: string;

  sprite: PIXI.Sprite;

  position: Position;

  socket: Socket;

  mine: boolean;

  constructor(
    mine: boolean = false,
    id: string,
    sprite: PIXI.Sprite,
    initialPosition: Position = Vector.ZERO,
  ) {
    this.id = id;
    this.mine = mine;
    this.sprite = sprite;
    this.position = initialPosition;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  move(pos: Position) {
    this.position.x += pos.x;
    this.position.y += pos.y;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    if (this.socket && this.mine) {
      socket.emit('move player', { id: this.id, position: this.position });
    }
  }

  setPosition(pos: Position) {
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  setSocket(sock: Socket) {
    this.socket = sock;
  }
}

export default GameObject;
