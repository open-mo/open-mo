import { TransitionType } from './enums';

function lerp(x: number, y: number, a: number) {
  return (1 - a) * x + a * y;
}

class Transition {
    from: number;

    to: number;

    duration: number;

    transType: TransitionType;

    callback: () => void;

    constructor(
      from: number,
      to: number,
      duration: number,
      transType: TransitionType = TransitionType.LINEAR,
    ) {
      this.from = from;
      this.to = to;
      this.duration = duration;
      this.transType = transType;
    }

    transition(freq: number): number {
      switch (this.transType) {
        case TransitionType.LINEAR:
          return lerp(this.from, this.to, freq);
        default:
          return 0;
      }
    }
}

export default Transition;
