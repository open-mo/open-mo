import * as PIXI from 'pixi.js';
import bonecoSprite from './examples/assets/buneco.png';
import { GameObject, Keyboard } from './engine/modules';
import { Key } from './engine/types';
import { Dictionary } from './types';
import socket from './network';
import setupGame from './game/chatSetup';
import { handleMessageData } from './network/dataHandler';
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

document.getElementById('canvas')?.appendChild(app.view);

const gameObjects: Dictionary<GameObject> = {};
// create a new Sprite from an image path
const sprite: PIXI.Sprite = PIXI.Sprite.from(bonecoSprite);
const character = new GameObject('1234', sprite, { x: app.screen.width / 2, y: app.screen.height / 2 });

// move the sprite to the center of the screen

Object.values(gameObjects).forEach((object) => app.stage.addChild(object.sprite));
app.stage.addChild(sprite);

// game setup
setupGame();

// socket.onopen = () => {
//   console.log('connection opened :)');
// };

socket.onmessage = ({ data }) => {
  handleMessageData(data);
};

// Listen for animate update
app.ticker.add((_delta: number) => {
  moveLeft.press = () => character.move({ x: -32, y: 0 });
  moveUp.press = () => character.move({ x: 0, y: -32 });
  moveRight.press = () => character.move({ x: 32, y: 0 });
  moveDown.press = () => character.move({ x: 0, y: 32 });
  if (moveLeft.isDown) {
    // character.position.x -= SPEED * delta;
  }

  if (moveUp.isDown) {
    // character.position.y -= SPEED * delta;
  }

  if (moveRight.isDown) {
    // character.position.x += SPEED * delta;
  }

  if (moveDown.isDown) {
    // character.y += SPEED * delta;
  }
});
