type HandlerFunction = (event: Event) => void;
type Noop = () => void;

export interface Key {
  /** Key value */
  value: string | number;
  /** Whether the key is pressed or not */
  isDown: boolean;
  /** Whether the key is up or not */
  isUp: boolean;
  downHandler: HandlerFunction;
  upHandler: HandlerFunction;
  /** Remove key listeners */
  unsubscribe: Noop;
  press: Noop;
  release: Noop;
}

export interface Position {
  x: number;
  y: number;
  /** Last received timestamp */
  timestamp?: number;
}
