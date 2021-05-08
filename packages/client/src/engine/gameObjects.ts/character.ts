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
    if (this.mine) {
      super.move(pos);
      if (this.mine) {
        socket.emit('move player', { id: this.id, position: this.position });
      }
    }
    this.nameLabel.position = this.sprite.position;
    this.nameLabel.position.y -= 12;
  }

  setPosition(pos: Position) {
    super.setPosition(pos);
    this.nameLabel.position = this.sprite.position;
    this.nameLabel.position.y -= 12;
  }
}

export default Character;
