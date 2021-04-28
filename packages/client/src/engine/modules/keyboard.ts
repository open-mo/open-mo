import { Key } from '../types';

class Keyboard {
  subscribedKeys: Array<Key> = [];

  element: EventTarget;

  constructor(element: EventTarget) {
    this.element = element;
  }

  addKey(value: string) {
    const key: Key = {
      value,
      isDown: false,
      isUp: true,
      press: () => {},
      release: () => {},
      unsubscribe: () => {},
      downHandler: () => {},
      upHandler: () => {},
    };

    key.downHandler = (event) => {
      if ((event as KeyboardEvent).key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    key.upHandler = (event) => {
      if ((event as KeyboardEvent).key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    this.element.addEventListener(
      'keydown', downListener, false,
    );
    this.element.addEventListener(
      'keyup', upListener, false,
    );

    key.unsubscribe = () => {
      this.element.removeEventListener('keydown', downListener);
      this.element.removeEventListener('keyup', upListener);

      const keyIndex = this.subscribedKeys.indexOf(key);
      if (keyIndex > -1) {
        this.subscribedKeys.filter((_, index: number) => index !== keyIndex);
      }
    };

    this.subscribedKeys.push(key);
    return key;
  }
}

export default Keyboard;
