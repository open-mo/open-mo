import * as PIXI from 'pixi.js';
import { GameObject } from '../modules';
import { Position } from '../types';
import { Vector } from '../modules/constants';
import socket from '../../network';

class Character extends GameObject {
  mine: boolean;

  nameLabel: PIXI.Text;

  nickname: string;

  stage: PIXI.Container;

  unacknowledgedMessages: Array<Position> = [];

  constructor(
    sprite: PIXI.Sprite,
    initialPosition: Position = Vector.ZERO,
    nickname: string,
    stage: PIXI.Container,
    mine: boolean = false,
  ) {
    super(socket.id, sprite, initialPosition);
    this.mine = mine;
    this.id = socket.id;
    this.stage = stage;
    this.nickname = nickname;

    /** FIXME: Remove magic numbers */
    this.nameLabel = new PIXI.Text(this.nickname, { fontSize: 10, fill: 0x000000, align: 'center' });
    this.nameLabel.parent = this.sprite;
    this.nameLabel.position.y -= 16;
    this.nameLabel.anchor.set(0.5);
    stage.addChild(this.nameLabel);
  }

  move(pos: Position) {
    super.move(pos);
    if (this.mine) {
      const movementData = {
        ...this.position,
        timestamp: new Date().getTime(),
      };
      this.unacknowledgedMessages.push(movementData);
      socket.emit('move player', { position: { ...movementData }, id: this.id });
    }
    this.nameLabel.position = this.sprite.position;
    this.nameLabel.position.y -= 12;
  }

  setPosition(pos: Position) {
    super.setPosition(pos);
    this.nameLabel.position = this.sprite.position;
    this.nameLabel.position.y -= 12;
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
}

export default Character;
