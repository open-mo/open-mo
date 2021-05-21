import * as PIXI from 'pixi.js';
import { Vector, TILE_SIZE } from './constants';
import { Position } from '../types';
import { Dictionary } from '../../types';
import { Tween } from '.';

class GameObject {
  id: string;

  app: PIXI.Application;

  sprite: PIXI.Sprite;

  position: Position;

  stage: PIXI.Container;

  parent: Dictionary<GameObject>;

  constructor(
    id: string,
    sprite: PIXI.Sprite,
    initialPosition: Position = Vector.ZERO,
    app: PIXI.Application,
  ) {
    this.id = id;
    this.sprite = sprite;
    this.position = initialPosition;
    this.stage = app.stage;
    this.sprite.x = this.position.x * TILE_SIZE;
    this.sprite.y = this.position.y * TILE_SIZE;
    this.sprite.anchor.set(0.5);
    this.app = app;
  }

  move(pos: Position, onFinish = () => {}) {
    const oldPosition: Position = { x: this.position.x, y: this.position.y };
    this.position.x += pos.x;
    this.position.y += pos.y;
    this.transitionMovement(oldPosition, onFinish);
  }

  setPosition(pos: Position) {
    const oldPosition = this.position;
    this.position = pos;
    // this.sprite.x = this.position.x * TILE_SIZE;
    // this.sprite.y = this.position.y * TILE_SIZE;
    this.transitionMovement(oldPosition);
  }

  setParent(parent: Dictionary<GameObject>) {
    this.parent = parent;
  }

  transitionMovement(oldPosition: Position, onFinish = () => {}) { // , speed)
    // TODO: Separate transitionX from transitionY
    const testPos: Position = {
      x: this.sprite.x / TILE_SIZE,
      y: this.sprite.y / TILE_SIZE,
    };
    if (oldPosition.x !== this.position.x) {
      const tween = new Tween(this.app.ticker);

      tween.set(testPos.x, this.position.x, 0.25);
      tween.start((x) => {
        this.sprite.x = Math.floor(x * TILE_SIZE);
      }, () => {
        this.sprite.x = this.position.x * TILE_SIZE;
        onFinish();
      });
    }

    if (oldPosition.y !== this.position.y) {
      const tweenY = new Tween(this.app.ticker);
      tweenY.set(testPos.y, this.position.y, 0.25);
      tweenY.start((y) => {
        this.sprite.y = Math.floor(y * TILE_SIZE);
      }, () => {
        this.sprite.y = this.position.y * TILE_SIZE;
        onFinish();
      });
    }
  }

  destroy() {
    this.stage.removeChild(this.sprite);
    delete this.parent[this.id];
  }
}

export default GameObject;
