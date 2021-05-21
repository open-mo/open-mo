import * as PIXI from 'pixi.js';
import { GameObject, Tween } from '../modules';
import { Position } from '../types';
import { Vector } from '../modules/constants';
import socket from '../../network';

class Character extends GameObject {
  mine: boolean;

  nameLabel: PIXI.Text;

  nickname: string;

  unacknowledgedMessages: Array<Position> = [];

  canMove: boolean = true;

  constructor(
    sprite: PIXI.Sprite,
    initialPosition: Position = Vector.ZERO,
    app: PIXI.Application,
    nickname: string,
    mine: boolean = false,
  ) {
    super(socket.id, sprite, initialPosition, app);
    this.mine = mine;
    this.id = socket.id;
    this.nickname = nickname;

    /** FIXME: Remove magic numbers */
    this.nameLabel = new PIXI.Text(this.nickname, { fontSize: 10, fill: 0x000000, align: 'center' });
    this.nameLabel.setParent(this.sprite);
    this.nameLabel.anchor.set(0.5, 1.5);
    this.sprite.addChild(this.nameLabel);
  }

  move(pos: Position) {
    if (this.mine && this.canMove) {
      this.canMove = false;
      super.move(pos, () => {
        this.canMove = true;
      });
      const movementData = {
        ...this.position,
        timestamp: new Date().getTime(),
      };
      this.unacknowledgedMessages.push(movementData);
      socket.emit('move player', { position: { ...movementData }, id: this.id });
    } else if (!this.mine) {
      console.log(pos);
      super.move(pos);
    }
  }

  setPosition(pos: Position) {
    if (!this.mine) {
      console.log(pos);
    }
    super.setPosition(pos);
  }

  updatePosition(pos: Position): void {
    if (!this.mine) return;
    const hasUnacknowledges = Boolean(this.unacknowledgedMessages.length);
    if (hasUnacknowledges) {
      const firstUnacknowledge = this.unacknowledgedMessages[0];
      const isDivergingPosition = firstUnacknowledge.x !== pos.x
      || firstUnacknowledge.y !== pos.y;
      if (firstUnacknowledge.timestamp === pos.timestamp && isDivergingPosition) {
        this.setPosition(firstUnacknowledge);
        console.log('reconciliated wrong position');
      }
      this.unacknowledgedMessages.shift();
    }
  }

  destroy() {
    super.destroy();
    this.stage.removeChild(this.nameLabel);
  }
}

export default Character;
