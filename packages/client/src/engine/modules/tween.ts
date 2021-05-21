import * as PIXI from 'pixi.js';
import Transition from './transition';
import { TransitionType } from './enums';

class Tween {
    transition: Transition;

    ticker: PIXI.Ticker;

    processing: boolean = false;

    constructor(ticker: PIXI.Ticker) {
      this.ticker = ticker;
    }

    /**
     * Defines a new Transition to be used
     * @param from - initial value
     * @param to - final value
     * @param duration - in seconds
     * @param transition - interpolation function to use: defaults to LINEAR
     */
    set(
      from: number,
      to: number,
      duration: number,
      transition: TransitionType = TransitionType.LINEAR,
    ) {
      if (this.transition) {
        this.transition = new Transition(this.transition.to, to, duration * 1000, transition);
      } else {
        this.transition = new Transition(from, to, duration * 1000, transition);
      }
    }

    /**
     * Start running the transition, bringing back each interpolated value
     * @param onUpdate - callback on each tick updated value (returns the interpolated value)
     * @param onFinish - callback on finish transition
     */
    start(onUpdate: (value: number) => void, onFinish?: () => void) {
      this.processing = true;
      const { duration } = this.transition;
      let currentDuration = 0;

      this.ticker.add(() => {
        if (this.processing) {
          currentDuration += this.ticker.deltaMS;
          const transitionProgress = currentDuration / duration;
          const processedValue = this.transition.transition(transitionProgress);
          onUpdate(processedValue);
          if (currentDuration > duration) {
            this.processing = false;
            if (onFinish) onFinish();
          }
        }
      });
    }
}

export default Tween;
