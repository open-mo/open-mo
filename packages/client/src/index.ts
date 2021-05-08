import * as PIXI from 'pixi.js';
import bonecoSprite from './examples/assets/buneco.png';
import { GameObject, Keyboard } from './engine/modules';
import { Character } from './engine/gameObjects.ts';
import { Key, Position } from './engine/types';
import socket from './network';
import { toggleChat, chatSubmit } from './game/chatSetup';
import { Dictionary } from './types';
import setupGame from './game';
import './style.css';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app: PIXI.Application = new PIXI.Application({ backgroundColor: 0x1099bb });
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
// create a new Sprite from an image path
let myCharacter: Character;
// app.stage.addChild(sprite);

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
      nickname,
      app.stage,
      mine,
    );

    gameObjects[id] = character;
    if (mine) {
      myCharacter = character;
    }
    app.stage.addChild(sprite);
  });
});

socket.on('users snapshot', (users: Dictionary<User>) => {
  Object.values(users).forEach((user: User) => {
    const { id, position } = user;
    if (!(id in gameObjects)) {
      return;
    }
    gameObjects[id].setPosition(position);
  });
});

// Object.values(gameObjects).forEach((object) => app.stage.addChild(object.sprite));
// game setup
setupGame();

// Listen for animate update
app.ticker.add(() => {
  moveLeft.press = () => myCharacter.move({ x: -32, y: 0 });
  moveUp.press = () => myCharacter.move({ x: 0, y: -32 });
  moveRight.press = () => myCharacter.move({ x: 32, y: 0 });
  moveDown.press = () => myCharacter.move({ x: 0, y: 32 });
});
