import { Dictionary } from '../../types';

class Character {
  id: string;

  nickname = '';

  position: Dictionary<number> = {
    x: 0,
    y: 0,
  }

  constructor(nickname: string = '', id: string = '') {
    this.nickname = nickname;
    this.id = id;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setID(id: string) {
    this.id = id;
  }
}

export default Character;
