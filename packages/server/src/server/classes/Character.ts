import { Position } from '../../types';

class Character {
  id: string;

  nickname = '';

  position: Position = {
    x: 0,
    y: 0,
  }

  constructor(id: string, nickname: string, initialPosition?: Position) {
    this.id = id;
    this.nickname = nickname;

    if (initialPosition) {
      this.position = initialPosition;
    }
  }

  setPosition(position: Position): void {
    this.position = position;
  }
}

export default Character;
