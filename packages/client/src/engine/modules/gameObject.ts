import * as PIXI from 'pixi.js';
import { Vector } from './constants';
import { Position } from '../types';

class GameObject {
  id: string;

  sprite: PIXI.Sprite;

  position: Position;

  constructor(id: string, sprite: PIXI.Sprite, initialPosition: Position = Vector.ZERO) {
    this.id = id;
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
  }
}

export default GameObject;
