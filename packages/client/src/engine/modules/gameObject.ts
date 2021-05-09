import * as PIXI from 'pixi.js';
import { Vector } from './constants';
import { Position } from '../types';
import { Dictionary } from '../../types';

class GameObject {
  id: string;

  sprite: PIXI.Sprite;

  position: Position;

  stage: PIXI.Container;

  parent: Dictionary<GameObject>;

  constructor(
    id: string,
    sprite: PIXI.Sprite,
    initialPosition: Position = Vector.ZERO,
    stage: PIXI.Container,
  ) {
    this.id = id;
    this.sprite = sprite;
    this.position = initialPosition;
    this.stage = stage;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.anchor.set(0.5);
  }

  move(pos: Position) {
    this.position.x += pos.x;
    this.position.y += pos.y;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  setPosition(pos: Position) {
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  setParent(parent: Dictionary<GameObject>) {
    this.parent = parent;
  }

  destroy() {
    console.log('removed');
    this.stage.removeChild(this.sprite);
    delete this.parent[this.id];
  }
}

export default GameObject;
