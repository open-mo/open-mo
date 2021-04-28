type HandlerFunction = (event: KeyboardEvent) => void;
type Noop = () => void;

export interface Key {
  /** Key value */
  value: string | number;
  /** Whether the key is pressed or not */
  isDown: boolean;
  /** Whether the key is up or not */
  isUp: boolean;
  downHandler: HandlerFunction | null;
  upHandler: HandlerFunction | null;
  /** Remove key listeners */
  unsubscribe: Noop | null;
  press: Noop | null;
  release: Noop | null;
}
