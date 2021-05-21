import * as PIXI from 'pixi.js';
import bonecoSprite from './examples/assets/buneco.png';
import {
  GameObject, Keyboard,
} from './engine/modules';
import { Character } from './engine/gameObjects.ts';
import { Key, Position } from './engine/types';
import socket from './network';
import { toggleChat, chatSubmit } from './game/chatSetup';
import { Dictionary } from './types';
import setupGame from './game';
import './style.css';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = false;

const app: PIXI.Application = new PIXI.Application({
  backgroundColor: 0x1099bb,
});
app.view.setAttribute('tabindex', '0');
app.view.focus();

const canvasKeyboard = new Keyboard(app.view);
const moveUp: Key = canvasKeyboard.addKey('w');
const moveLeft: Key = canvasKeyboard.addKey('a');
const moveDown: Key = canvasKeyboard.addKey('s');
const moveRight: Key = canvasKeyboard.addKey('d');
const canvasEnter: Key = canvasKeyboard.addKey('Enter');
const inputKeyboard = new Keyboard(document.querySelector('.chat-input'));
const inputEnter: Key = inputKeyboard.addKey('Enter');

canvasEnter.press = () => toggleChat(true);
inputEnter.press = () => {
  const chatInput = <HTMLInputElement>document.querySelector('.chat-input');
  if (chatInput.value.length) {
    chatSubmit();
  } else {
    toggleChat(false);
  }
};

document.getElementById('canvas')?.appendChild(app.view);

const gameObjects: Dictionary<GameObject> = {};
let myCharacter: Character;

function getGameObject(id: string): GameObject | null {
  const gameObject = gameObjects[id] ?? null;
  return gameObject;
}
interface User {
  id: string;
  nickname: string;
  position: Position;
}

socket.on('users', (users) => {
  Object.values(users).forEach((user: User) => {
    const { id, position, nickname } = user;
    if (id in gameObjects) {
      return;
    }
    const sprite: PIXI.Sprite = PIXI.Sprite.from(bonecoSprite);
    const mine = id === socket.id;
    const character = new Character(
      sprite,
      {
        x: position.x,
        y: position.y,
      },
      app,
      nickname,
      mine,
    );

    gameObjects[id] = character;
    character.setParent(gameObjects);
    if (mine) {
      /**
       * Prevent local character from being "duplicated"
       * after reconnection.
       * */
      if (myCharacter) {
        console.log('destroyed');
        myCharacter.destroy();
      }
      myCharacter = character;
    }
    app.stage.addChild(sprite);
  });
});

socket.on('remove player', (id: string) => {
  const gameObject = getGameObject(id);
  gameObject?.destroy();
});

socket.on('set local position', (nextPosition) => {
  myCharacter.updatePosition(nextPosition);
});

socket.on('users snapshot', (users: Dictionary<User>) => {
  Object.values(users).forEach((user: User) => {
    const { id, position } = user;
    if (!(id in gameObjects) || id === myCharacter.id) {
      return;
    }
    (<Character>gameObjects[id]).setPosition(position);
  });
});

// app.stage.scale.set(2);
// Object.values(gameObjects).forEach((object) => app.stage.addChild(object.sprite));
// game setup
setupGame();

// Listen for animate update
app.ticker.add(() => {
  if (myCharacter) {
    // console.log(perc);
    if (moveLeft.isDown) {
      myCharacter.move({ x: -1, y: 0 });
    }
    if (moveRight.isDown) {
      myCharacter.move({ x: 1, y: 0 });
    }
    if (moveDown.isDown) {
      myCharacter.move({ x: 0, y: 1 });
    }
    if (moveUp.isDown) {
      myCharacter.move({ x: 0, y: -1 });
    }
    // moveLeft.press = () => myCharacter.move({ x: -1, y: 0 });
    // moveUp.press = () => myCharacter.move({ x: 0, y: -1 });
    // moveRight.press = () => myCharacter.move({ x: 1, y: 0 });
    // moveDown.press = () => myCharacter.move({ x: 0, y: 1 });
    // myCharacter.setPosition({ x: lerp(3, 5, perc), y: 4 });
  }
});

//
/**
 * Desired API
 * Tween.linear(x, y, tempo, (value) => cb fn)
 */
